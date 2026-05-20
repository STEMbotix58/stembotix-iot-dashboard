type Callback = () => void;

class ReconnectHandler {
  private reconnectCallbacks: Callback[] = [];

  initialize() {
    window.addEventListener("online", this.handleReconnect);

    window.addEventListener("offline", this.handleOffline);
  }

  destroy() {
    window.removeEventListener("online", this.handleReconnect);

    window.removeEventListener("offline", this.handleOffline);
  }

  onReconnect(callback: Callback) {
    this.reconnectCallbacks.push(callback);
  }

  isOnline() {
    return navigator.onLine;
  }

  private handleReconnect = () => {
    console.log("Network restored");

    this.reconnectCallbacks.forEach((callback) => callback());
  };

  private handleOffline = () => {
    console.warn("Network disconnected");
  };
}

export default new ReconnectHandler();
