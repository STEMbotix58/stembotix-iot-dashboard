import { controlsApi } from "../api/controls.api";

import commandQueueService from "./command-queue.service";
import mqttCommandService from "./mqtt-command.service";
import retryManager from "@/core/offline/retry-manager";

import loggerService from "@/core/services/logger.service";

import transformCommandPayload from "../transformers/command-payload.transformer";

import {
  deviceCommandSchema,
  type DeviceCommandInput,
} from "../schemas/control.schema";

class DeviceCommandService {
  async execute(payload: DeviceCommandInput) {
    deviceCommandSchema.parse(payload);
    loggerService.info("Executing device command", payload);
    commandQueueService.add(payload);

    mqttCommandService.publish(payload);

    const transformedPayload = transformCommandPayload(payload);

    try {
      const response = await retryManager.execute(
        async () => {
          return await controlsApi.sendCommand(transformedPayload);
        },
        {
          retries: 3,
          delay: 1200,
        },
      );

      commandQueueService.complete(payload);
      return response;
    } catch (error) {
      loggerService.error("Command execution failed", error);
      throw error;
    }
  }
}

export default new DeviceCommandService();
