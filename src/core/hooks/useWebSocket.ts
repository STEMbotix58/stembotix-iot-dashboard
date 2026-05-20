import { useEffect, useState } from "react";

import websocketClient from "@/core/api/websocket-client";

const useWebSocket = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    websocketClient.connect();

    setConnected(websocketClient.isConnected());

    websocketClient.onOpen(() => {
      setConnected(true);
    });

    websocketClient.onClose(() => {
      setConnected(false);
    });
  }, []);

  return {
    connected,

    send: (payload: unknown) => {
      websocketClient.send(payload);
    },
  };
};

export default useWebSocket;
