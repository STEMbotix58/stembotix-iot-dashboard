import type { Telemetry } from "@/entities/telemetry/telemetry.types";
import mqttTelemetryAdapter from "../adapters/mqtt.adapter";
class TelemetryParserService {
  parse(raw: string): Telemetry | null {
    try {
      const payload = JSON.parse(raw);
      return mqttTelemetryAdapter(payload);
    } catch {
      return null;
    }
  }
}

export default new TelemetryParserService();
