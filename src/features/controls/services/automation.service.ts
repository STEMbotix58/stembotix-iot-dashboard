import deviceCommandService from "./device-command.service";
import loggerService from "@/core/services/logger.service";
import type { DeviceCommandValue } from "../schemas/control.schema";

type AutomationRule = {
  id: string;
  deviceId: string;
  condition: boolean;
  command: string;
  value?: DeviceCommandValue;
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
