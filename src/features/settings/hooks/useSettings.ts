import { useEffect, useState } from "react";
import settingsService from "../services/settings.service";
import type { SettingsPayload } from "../api/settings.api";

const defaultSettings: SettingsPayload = {
  darkMode: false,
  notifications: true,
  autoRefresh: true,
  timezone: "UTC",
};

const useSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const data = await settingsService.fetchSettings();
        setSettings(data);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const updateSettings = async (payload: SettingsPayload) => {
    setSettings(payload);
    await settingsService.saveSettings(payload);
  };

  return {
    settings,
    loading,
    updateSettings,
  };
};

export default useSettings;
