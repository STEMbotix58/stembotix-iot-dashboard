import { useState } from "react";

import automationService from "../services/automation.service";
import type { DeviceCommandValue } from "../schemas/control.schema";

type AutomationRule = {
  id: string;
  deviceId: string;
  condition: boolean;
  command: string;
  value?: DeviceCommandValue;
};

const useAutomationRules = () => {
  const [rules, setRules] = useState<AutomationRule[]>([]);

  const addRule = (rule: AutomationRule) => {
    setRules((prev) => [...prev, rule]);
  };

  const executeRules = async () => {
    for (const rule of rules) {
      await automationService.executeRule(rule);
    }
  };

  return {
    rules,
    addRule,
    executeRules,
  };
};

export default useAutomationRules;
