import { settingsApi, type SettingsPayload } from "../api/settings.api";
import loggerService from "@/core/services/logger.service";

class SettingsService {
  async fetchSettings() {
    try {
      const response = await settingsApi.getSettings();
      return response.data;
    } catch (error) {
      loggerService.error("Failed to fetch settings", error);

      throw error;
    }
  }

  async saveSettings(payload: SettingsPayload) {
    try {
      const response = await settingsApi.updateSettings(payload);
      return response.data;
    } catch (error) {
      loggerService.error("Failed to save settings", error);
      throw error;
    }
  }
}

export default new SettingsService();
