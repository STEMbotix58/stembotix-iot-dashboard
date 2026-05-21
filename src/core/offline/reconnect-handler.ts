import eventBus from "@/core/events/event-bus";
import RUNTIME_EVENTS from "@/core/events/runtime-events";
import loggerService from "@/core/services/logger.service";

type Callback = () => void;

class ReconnectHandler {
  private reconnectCallbacks = new Set<Callback>();

  private initialized = false;

  initialize() {
    if (this.initialized || typeof window === "undefined") {
      return;
    }

    this.initialized = true;

    window.addEventListener("online", this.handleReconnect);

    window.addEventListener("offline", this.handleOffline);
  }

  destroy() {
    if (!this.initialized || typeof window === "undefined") {
      return;
    }

    window.removeEventListener("online", this.handleReconnect);

    window.removeEventListener("offline", this.handleOffline);

    this.reconnectCallbacks.clear();
    this.initialized = false;
  }

  onReconnect(callback: Callback) {
    this.reconnectCallbacks.add(callback);

    return () => {
      this.reconnectCallbacks.delete(callback);
    };
  }

  isOnline() {
    if (typeof navigator === "undefined") {
      return true;
    }

    return navigator.onLine;
  }

  private handleReconnect = () => {
    loggerService.info("Network restored");

    eventBus.emit(RUNTIME_EVENTS.NETWORK_ONLINE, {
      online: true,
      timestamp: new Date().toISOString(),
    });

    this.reconnectCallbacks.forEach((callback) => {
      try {
        callback();
      } catch (error) {
        loggerService.error("Reconnect callback failed", error);
      }
    });
  };

  private handleOffline = () => {
    loggerService.warn("Network disconnected");

    eventBus.emit(RUNTIME_EVENTS.NETWORK_OFFLINE, {
      online: false,
      timestamp: new Date().toISOString(),
    });
  };
}

export default new ReconnectHandler();
