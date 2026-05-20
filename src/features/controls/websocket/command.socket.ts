import websocketClient from "@/core/api/websocket-client";
import loggerService from "@/core/services/logger.service";
import { COMMAND_EVENTS } from "./command-events";

type CommandEventPayload = {
  id: string;
  deviceId: string;
  status: string;
};

class CommandSocket {
  subscribe() {
    websocketClient.subscribe((event) => {
      try {
        const payload = JSON.parse(event.data);
        this.handleEvent(payload);
      } catch (error) {
        loggerService.error("Failed to parse command socket message", error);
      }
    });
  }

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
