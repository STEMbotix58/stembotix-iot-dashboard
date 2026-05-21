import socketConfig from "@/core/config/socket.config";
import eventBus from "@/core/events/event-bus";
import RUNTIME_EVENTS from "@/core/events/runtime-events";
import loggerService from "@/core/services/logger.service";

type WebSocketStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected";

class WebSocketClient {
  private socket: WebSocket | null = null;

  private openListeners = new Set<() => void>();

  private closeListeners = new Set<() => void>();

  private messageListeners = new Set<(event: MessageEvent) => void>();

  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  private reconnectAttempts = 0;

  private intentionalClose = false;

  private status: WebSocketStatus = "idle";

  connect() {
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    if (!socketConfig.websocket.url) {
      loggerService.warn("WebSocket URL is not configured");
      return;
    }

    this.clearReconnectTimer();
    this.intentionalClose = false;
    this.status = this.reconnectAttempts ? "reconnecting" : "connecting";
    this.socket = new WebSocket(socketConfig.websocket.url);

    this.socket.onopen = () => {
      this.status = "connected";
      this.reconnectAttempts = 0;
      loggerService.info("WebSocket connected");

      this.openListeners.forEach((listener) => {
        try {
          listener();
        } catch (error) {
          loggerService.error("WebSocket open listener failed", error);
        }
      });
      eventBus.emit(RUNTIME_EVENTS.WEBSOCKET_CONNECTED, {
        url: socketConfig.websocket.url,
        timestamp: new Date().toISOString(),
      });
    };

    this.socket.onclose = (event) => {
      this.status = "disconnected";
      loggerService.warn("WebSocket disconnected", {
        code: event.code,
        reason: event.reason,
      });

      this.closeListeners.forEach((listener) => {
        try {
          listener();
        } catch (error) {
          loggerService.error("WebSocket close listener failed", error);
        }
      });

      this.socket = null;
      eventBus.emit(RUNTIME_EVENTS.WEBSOCKET_DISCONNECTED, {
        code: event.code,
        reason: event.reason,
        timestamp: new Date().toISOString(),
      });

      if (!this.intentionalClose && socketConfig.websocket.reconnect) {
        this.scheduleReconnect();
      }
    };

    this.socket.onerror = (error) => {
      loggerService.error("WebSocket error", error);
      eventBus.emit(RUNTIME_EVENTS.WEBSOCKET_ERROR, error);
    };

    this.socket.onmessage = (event) => {
      eventBus.emit(RUNTIME_EVENTS.WEBSOCKET_MESSAGE, {
        data: event.data,
        timestamp: new Date().toISOString(),
      });
      this.messageListeners.forEach((listener) => {
        try {
          listener(event);
        } catch (error) {
          loggerService.error("WebSocket message listener failed", error);
        }
      });
    };
  }

  disconnect() {
    this.intentionalClose = true;
    this.clearReconnectTimer();
    this.socket?.close();
    this.socket = null;
    this.status = "disconnected";
  }

  send(payload: unknown) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(payload));
      return true;
    }

    loggerService.warn("WebSocket send skipped because socket is not open");
    return false;
  }

  subscribe(callback: (event: MessageEvent) => void) {
    this.messageListeners.add(callback);

    return () => {
      this.messageListeners.delete(callback);
    };
  }

  onOpen(callback: () => void) {
    this.openListeners.add(callback);

    return () => {
      this.openListeners.delete(callback);
    };
  }

  onClose(callback: () => void) {
    this.closeListeners.add(callback);

    return () => {
      this.closeListeners.delete(callback);
    };
  }

  isConnected() {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  getStatus() {
    return this.status;
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return;

    if (this.reconnectAttempts >= socketConfig.websocket.maxRetries) {
      loggerService.error("WebSocket reconnect limit reached");
      return;
    }

    this.status = "reconnecting";
    this.reconnectAttempts += 1;

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, socketConfig.websocket.reconnectDelay);
  }

  private clearReconnectTimer() {
    if (!this.reconnectTimer) return;

    clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
  }
}

const websocketClient = new WebSocketClient();

export default websocketClient;
