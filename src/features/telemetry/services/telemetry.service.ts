import telemetryStreamService from "./telemetry-stream.service";
import telemetryParserService from "./telemetry-parser.service";
import loggerService from "@/core/services/logger.service";

class TelemetryService {
  processIncoming(raw: string) {
    const telemetry = telemetryParserService.parse(raw);
    if (!telemetry) {
      loggerService.warn("Invalid telemetry payload");
      return;
    }
    telemetryStreamService.emit(telemetry);
    loggerService.info("Telemetry received", telemetry);
  }
}

export default new TelemetryService();
