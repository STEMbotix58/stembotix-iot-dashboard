import socketConfig from "@/core/config/socket.config";

type MessageHandler = (event: MessageEvent) => void;

type VoidHandler = () => void;

class WebSocketClient {
  private socket: WebSocket | null = null;

  connect() {
    if (this.socket) return;

    this.socket = new WebSocket(socketConfig.websocket.url);

    this.socket.onopen = () => {
      console.log("WebSocket connected");
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");

      this.socket = null;
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  disconnect() {
    this.socket?.close();
  }

  send(payload: unknown) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(payload));
    }
  }

  subscribe(callback: MessageHandler) {
    if (!this.socket) return;

    this.socket.onmessage = callback;
  }

  onOpen(callback: VoidHandler) {
    if (!this.socket) return;

    this.socket.onopen = callback;
  }

  onClose(callback: VoidHandler) {
    if (!this.socket) return;

    this.socket.onclose = callback;
  }

  isConnected() {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}

const websocketClient = new WebSocketClient();

export default websocketClient;
