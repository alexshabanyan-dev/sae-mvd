import { createRpcClient } from "./rpc";

const RPC_URL = "/rpc";

export const rpcClient = createRpcClient({ url: RPC_URL });
