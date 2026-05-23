import type { JsonRpcErrorObject } from "./types";

export class RpcTransportError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "RpcTransportError";
  }
}

export class RpcProtocolError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RpcProtocolError";
  }
}

export class RpcServerError<TData = unknown> extends Error {
  constructor(
    public readonly rpcError: JsonRpcErrorObject<TData>,
    public readonly requestId: string | number | null,
  ) {
    super(rpcError.message);
    this.name = "RpcServerError";
  }
}

export class RpcTimeoutError extends Error {
  constructor(message = "RPC request timed out") {
    super(message);
    this.name = "RpcTimeoutError";
  }
}
