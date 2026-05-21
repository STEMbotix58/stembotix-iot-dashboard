import runtimeSubscriptionManager from "@/app/runtime/runtime-subscription.manager";
import websocketClient from "@/core/api/websocket-client";
import loggerService from "@/core/services/logger.service";
import { COMMAND_EVENTS } from "./command-events";

type CommandEventPayload = {
  id: string;
  deviceId: string;
  status: string;
};

class CommandSocket {
  initialize() {
    if (
      this.unsubscribe ||
      runtimeSubscriptionManager.has("command-websocket:messages")
    ) {
      return;
    }

    this.unsubscribe = websocketClient.subscribe((event) => {
      try {
        if (typeof event.data !== "string") {
          return;
        }

        const payload = JSON.parse(event.data);
        this.handleEvent(payload);
      } catch (error) {
        loggerService.error("Failed to parse command socket message", error);
      }
    });

    runtimeSubscriptionManager.register("command-websocket:messages", () => {
      this.unsubscribe?.();
      this.unsubscribe = undefined;
    });
  }

  destroy() {
    runtimeSubscriptionManager.dispose("command-websocket:messages");
  }

  private unsubscribe?: () => void;

  private handleEvent(payload: { event: string; data: CommandEventPayload }) {
    switch (payload.event) {
      case COMMAND_EVENTS.COMMAND_CREATED:
        loggerService.info("Command created", payload.data);
        break;
      case COMMAND_EVENTS.COMMAND_SUCCESS:
        loggerService.info("Command success", payload.data);
        break;
      case COMMAND_EVENTS.COMMAND_FAILED:
        loggerService.warn("Command failed", payload.data);
        break;
      default:
        break;
    }
  }
}

export default new CommandSocket();
