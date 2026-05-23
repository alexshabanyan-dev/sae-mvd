export type JsonRpcId = string | number;

export interface JsonRpcRequest<TParams = unknown> {
  jsonrpc: "2.0";
  id: JsonRpcId;
  method: string;
  params?: TParams;
}

export interface JsonRpcSuccess<TResult = unknown> {
  jsonrpc: "2.0";
  id: JsonRpcId;
  result: TResult;
}

export interface JsonRpcErrorObject<TData = unknown> {
  code: number;
  message: string;
  data?: TData;
}

export interface JsonRpcFailure<TData = unknown> {
  jsonrpc: "2.0";
  id: JsonRpcId | null;
  error: JsonRpcErrorObject<TData>;
}

export type JsonRpcResponse<TResult = unknown, TErrorData = unknown> =
  | JsonRpcSuccess<TResult>
  | JsonRpcFailure<TErrorData>;

export interface RpcCallContext<TParams = unknown> {
  request: JsonRpcRequest<TParams>;
  url: string;
  init: RequestInit;
}

export interface RpcResponseContext<TResult = unknown> {
  request: JsonRpcRequest<unknown>;
  response: Response;
  body: JsonRpcResponse<TResult>;
}

export interface RpcErrorContext {
  request?: JsonRpcRequest<unknown>;
  error: unknown;
}

export interface RpcMiddleware {
  beforeRequest?(ctx: RpcCallContext): Promise<void> | void;
  afterResponse?(ctx: RpcResponseContext): Promise<void> | void;
  onError?(ctx: RpcErrorContext): Promise<void> | void;
}

export interface RpcCallOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
  headers?: HeadersInit;
}

export interface RpcClientOptions {
  url: string;
  headers?: HeadersInit;
  timeoutMs?: number;
  middleware?: RpcMiddleware[];
}
