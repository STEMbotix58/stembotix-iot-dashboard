import { useEffect, useState } from "react";

import websocketClient from "@/core/api/websocket-client";

const useWebSocket = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(websocketClient.isConnected());

    const unsubscribeOpen = websocketClient.onOpen(() => {
      setConnected(true);
    });

    const unsubscribeClose = websocketClient.onClose(() => {
      setConnected(false);
    });

    return () => {
      unsubscribeOpen();
      unsubscribeClose();
    };
  }, []);

  return {
    connected,

    send: (payload: unknown) => {
      websocketClient.send(payload);
    },
  };
};

export default useWebSocket;
