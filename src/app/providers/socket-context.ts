import { createContext, useContext } from "react";

import websocketClient from "@/core/api/websocket-client";

export const SocketContext = createContext(websocketClient);

export const useSocket = () => {
  return useContext(SocketContext);
};
