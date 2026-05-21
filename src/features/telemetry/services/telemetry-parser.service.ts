import type { Telemetry } from "@/entities/telemetry/telemetry.types";
import telemetryNormalizerService, {
  type TelemetryNormalizationContext,
} from "./telemetry-normalizer.service";

class TelemetryParserService {
  parse(
    raw: unknown,
    context?: Partial<TelemetryNormalizationContext>,
  ): Telemetry | null {
    const result = telemetryNormalizerService.normalize(raw, {
      source: context?.source ?? "runtime",
      topic: context?.topic,
      receivedAt: context?.receivedAt,
    });

    return result.ok ? result.telemetry : null;
  }
}

const telemetryParserService = new TelemetryParserService();

export default telemetryParserService;
