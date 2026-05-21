import runtimeSubscriptionManager from "@/app/runtime/runtime-subscription.manager";
import eventBus from "@/core/events/event-bus";
import RUNTIME_EVENTS from "@/core/events/runtime-events";
import type { Telemetry } from "@/entities/telemetry/telemetry.types";
import deviceCommandService from "@/features/controls/services/device-command.service";
import { deviceTemplates } from "@/features/devices/templates/device-templates";

class AutomationEngine {
  private initialized = false;

  initialize() {
    if (this.initialized) return;
    this.initialized = true;

    runtimeSubscriptionManager.register(
      "automation-engine:telemetry",
      eventBus.on<Telemetry>(RUNTIME_EVENTS.TELEMETRY_PROCESSED, (telemetry) =>
        this.evaluate(telemetry),
      ),
    );
  }

  destroy() {
    runtimeSubscriptionManager.dispose("automation-engine:telemetry");
    this.initialized = false;
  }

  async evaluate(telemetry: Telemetry) {
    const metricsByKey = new Map(
      telemetry.metrics.map((metric) => [metric.key, metric]),
    );
    const metricKeys = new Set(metricsByKey.keys());

    const relevantTemplates = deviceTemplates.filter((template) => {
      const triggers = template.automationRules.map((rule) => rule.trigger);

      return triggers.some((trigger) => metricKeys.has(trigger));
    });

    for (const template of relevantTemplates) {
      for (const rule of template.automationRules) {
        if (!rule.enabled) {
          continue;
        }

        const metric = metricsByKey.get(rule.trigger);

        if (!metric) continue;

        const thresholdMet = this.evaluateCondition(
          metric.value,
          rule.condition,
        );

        if (!thresholdMet) continue;

        if (rule.action.type === "command") {
          await deviceCommandService.execute({
            deviceId: telemetry.deviceId,
            command: rule.action.command,
            value: rule.action.value,
          });
        }
      }
    }
  }

  private evaluateCondition(
    value: number,
    condition: { operator: string; threshold: number },
  ) {
    switch (condition.operator) {
      case "gte":
        return value >= condition.threshold;
      case "lte":
        return value <= condition.threshold;
      case "eq":
        return value === condition.threshold;
      case "neq":
        return value !== condition.threshold;
      default:
        return false;
    }
  }
}

export default new AutomationEngine();
