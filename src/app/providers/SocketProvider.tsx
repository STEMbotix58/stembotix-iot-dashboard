import { type ReactNode, useEffect } from "react";

import websocketClient from "@/core/api/websocket-client";
import { SocketContext } from "./socket-context";
import reconnectHandler from "@/core/offline/reconnect-handler";

type Props = {
  children: ReactNode;
};

const SocketProvider = ({ children }: Props) => {
  useEffect(() => {
    websocketClient.connect?.();
    reconnectHandler.initialize();

    reconnectHandler.onReconnect(() => {
      websocketClient.connect?.();
    });

    return () => {
      websocketClient.disconnect?.();
    };
  }, []);

  return (
    <SocketContext.Provider value={websocketClient}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
