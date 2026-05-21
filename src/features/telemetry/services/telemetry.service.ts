import eventBus from "@/core/events/event-bus";
import RUNTIME_EVENTS from "@/core/events/runtime-events";
import loggerService from "@/core/services/logger.service";
import telemetryNormalizerService, {
  type TelemetryNormalizationContext,
} from "./telemetry-normalizer.service";

class TelemetryService {
  processIncoming(
    raw: unknown,
    context: TelemetryNormalizationContext = {
      source: "runtime",
    },
  ) {
    eventBus.emit(RUNTIME_EVENTS.TELEMETRY_RAW, {
      raw,
      ...context,
    });

    const normalized = telemetryNormalizerService.normalize(raw, context);

    if (!normalized.ok) {
      loggerService.warn("Invalid telemetry payload", {
        errors: normalized.errors,
        source: normalized.source,
        topic: normalized.topic,
      });

      eventBus.emit(RUNTIME_EVENTS.TELEMETRY_INVALID, normalized);
      return;
    }

    eventBus.emit(RUNTIME_EVENTS.TELEMETRY_NORMALIZED, normalized.telemetry);
  }
}

export default new TelemetryService();
