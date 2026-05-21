import { z } from "zod";

export const deviceCommandSchema = z.object({
  deviceId: z.string().min(1),
  command: z.string().min(1),
  value: z.union([z.string(), z.number(), z.boolean()]).optional(),
});

export const automationRuleSchema = z.object({
  trigger: z.string().min(1),
  action: z.string().min(1),
  enabled: z.boolean(),
});

export type DeviceCommandInput = z.infer<typeof deviceCommandSchema>;
export type AutomationRuleInput = z.infer<typeof automationRuleSchema>;
export type DeviceCommandValue = DeviceCommandInput["value"];
