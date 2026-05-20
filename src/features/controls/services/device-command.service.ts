import { controlsApi } from "../api/controls.api";

import commandQueueService from "./command-queue.service";
import mqttCommandService from "./mqtt-command.service";

import loggerService from "@/core/services/logger.service";

import transformCommandPayload from "../transformers/command-payload.transformer";

import { deviceCommandSchema } from "../schemas/control.schema";

type DeviceCommandInputPayload = {
  deviceId: string;
  command: string;
  value?: string | number | boolean;
};

class DeviceCommandService {
  async execute(payload: DeviceCommandInputPayload) {
    try {
      loggerService.info("Executing device command", payload);
      commandQueueService.add(payload);
      mqttCommandService.publish(payload);
      deviceCommandSchema.parse(payload);
      const transformedPayload = transformCommandPayload(payload);
      const response = await controlsApi.sendCommand(transformedPayload);
      commandQueueService.complete(payload);
      return response;
    } catch (error) {
      loggerService.error("Command execution failed", error);
      throw error;
    }
  }
}

export default new DeviceCommandService();
