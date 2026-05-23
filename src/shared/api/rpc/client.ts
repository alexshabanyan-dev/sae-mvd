import {
  RpcProtocolError,
  RpcServerError,
  RpcTimeoutError,
  RpcTransportError,
} from "./errors";
import type {
  JsonRpcRequest,
  JsonRpcResponse,
  RpcCallOptions,
  RpcClientOptions,
  RpcMiddleware,
} from "./types";

function createRequestId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function mergeSignals(signalA?: AbortSignal, signalB?: AbortSignal) {
  if (!signalA) return signalB;
  if (!signalB) return signalA;

  const controller = new AbortController();
  const abort = () => controller.abort();
  signalA.addEventListener("abort", abort, { once: true });
  signalB.addEventListener("abort", abort, { once: true });
  return controller.signal;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isJsonRpcResponse(value: unknown): value is JsonRpcResponse {
  if (!isObject(value)) return false;
  if (value.jsonrpc !== "2.0") return false;
  if (!("id" in value)) return false;
  return "result" in value || "error" in value;
}

export interface RpcClient {
  call<TResult, TParams = unknown>(
    method: string,
    params?: TParams,
    options?: RpcCallOptions,
  ): Promise<TResult>;
}

export function createRpcClient(options: RpcClientOptions): RpcClient {
  const url = options.url;
  const defaultHeaders = options.headers ?? {};
  const defaultTimeoutMs = options.timeoutMs ?? 15_000;
  const middleware: RpcMiddleware[] = options.middleware ?? [];

  return {
    async call<TResult, TParams = unknown>(
      method: string,
      params?: TParams,
      callOptions?: RpcCallOptions,
    ): Promise<TResult> {
      const request: JsonRpcRequest<TParams> = {
        jsonrpc: "2.0",
        id: createRequestId(),
        method,
        params,
      };

      const timeoutMs = callOptions?.timeoutMs ?? defaultTimeoutMs;
      const timeoutController = new AbortController();
      const timeoutId = setTimeout(() => timeoutController.abort(), timeoutMs);
      const signal = mergeSignals(callOptions?.signal, timeoutController.signal);

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...defaultHeaders,
        ...(callOptions?.headers ?? {}),
      };

      const init: RequestInit = {
        method: "POST",
        headers,
        body: JSON.stringify(request),
        signal,
      };

      const callContext = {
        request,
        url,
        init,
      };

      try {
        for (const item of middleware) {
          await item.beforeRequest?.(callContext);
        }

        let httpResponse: Response;
        try {
          httpResponse = await fetch(url, init);
        } catch (error) {
          if (signal?.aborted) throw new RpcTimeoutError();
          throw new RpcTransportError("Failed to send RPC request", error);
        }

        let payload: unknown;
        try {
          payload = await httpResponse.json();
        } catch {
          throw new RpcProtocolError(
            `RPC response is not valid JSON (HTTP ${httpResponse.status})`,
          );
        }

        if (!isJsonRpcResponse(payload)) {
          throw new RpcProtocolError("RPC response has invalid JSON-RPC shape");
        }

        const responseContext = {
          request,
          response: httpResponse,
          body: payload,
        };

        for (const item of middleware) {
          await item.afterResponse?.(responseContext);
        }

        if ("error" in payload) {
          throw new RpcServerError(payload.error, payload.id);
        }

        return payload.result as TResult;
      } catch (error) {
        for (const item of middleware) {
          await item.onError?.({ request, error });
        }
        throw error;
      } finally {
        clearTimeout(timeoutId);
      }
    },
  };
}
