import websocketClient from "@/core/api/websocket-client";
import telemetryService from "../services/telemetry.service";
import loggerService from "@/core/services/logger.service";

class TelemetrySocket {
  connect() {
    websocketClient.connect();
    websocketClient.subscribe((event) => {
      try {
        telemetryService.processIncoming(event.data);
      } catch (error) {
        loggerService.error("Telemetry socket error", error);
      }
    });
  }
}

export default new TelemetrySocket();
