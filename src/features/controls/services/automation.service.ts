import deviceCommandService from "./device-command.service";

import loggerService from "@/core/services/logger.service";

type AutomationRule = {
  id: string;

  deviceId: string;

  condition: boolean;

  command: string;

  value?: unknown;
};

class AutomationService {
  async executeRule(rule: AutomationRule) {
    if (!rule.condition) {
      return;
    }

    loggerService.info("Executing automation rule", rule);

    await deviceCommandService.execute({
      deviceId: rule.deviceId,

      command: rule.command,

      value: rule.value,
    });
  }
}

export default new AutomationService();
