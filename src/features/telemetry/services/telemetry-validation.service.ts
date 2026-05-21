import type { Telemetry } from "@/entities/telemetry/telemetry.types";

export type TelemetryValidationResult = {
  valid: boolean;
  errors: string[];
};

class TelemetryValidationService {
  validate(telemetry: Telemetry | null): TelemetryValidationResult {
    const errors: string[] = [];

    if (!telemetry) {
      return {
        valid: false,
        errors: ["Telemetry payload could not be normalized"],
      };
    }

    if (!telemetry.id) {
      errors.push("Telemetry id is missing");
    }

    if (!telemetry.deviceId) {
      errors.push("Telemetry deviceId is missing");
    }

    if (!telemetry.timestamp || Number.isNaN(Date.parse(telemetry.timestamp))) {
      errors.push("Telemetry timestamp is invalid");
    }

    if (!Array.isArray(telemetry.metrics) || telemetry.metrics.length === 0) {
      errors.push("Telemetry metrics are missing");
    }

    telemetry.metrics.forEach((metric, index) => {
      if (!metric || typeof metric !== "object") {
        errors.push(`Metric ${index} is malformed`);
        return;
      }

      if (typeof metric.key !== "string" || !metric.key.trim()) {
        errors.push(`Metric ${index} key is missing`);
      }

      if (!Number.isFinite(metric.value)) {
        errors.push(`Metric ${metric.key || index} value is not numeric`);
      }
    });

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export default new TelemetryValidationService();
