import { type ReactNode } from "react";

import websocketClient from "@/core/api/websocket-client";
import { SocketContext } from "./socket-context";

type Props = {
  children: ReactNode;
};

const SocketProvider = ({ children }: Props) => {
  return (
    <SocketContext.Provider value={websocketClient}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
