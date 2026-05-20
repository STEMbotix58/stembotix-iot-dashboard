import useSettings from "../hooks/useSettings";

import ThemeSettings from "../components/ThemeSettings";
import NotificationSettings from "../components/NotificationSettings";
import UserPreferences from "../components/UserPreferences";

const SettingsPage = () => {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage dashboard preferences
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ThemeSettings
          darkMode={settings.darkMode}
          onToggle={() =>
            updateSettings({
              ...settings,

              darkMode: !settings.darkMode,
            })
          }
        />

        <NotificationSettings
          enabled={settings.notifications}
          onToggle={() =>
            updateSettings({
              ...settings,

              notifications: !settings.notifications,
            })
          }
        />

        <div className="xl:col-span-2">
          <UserPreferences
            timezone={settings.timezone}
            autoRefresh={settings.autoRefresh}
            onTimezoneChange={(value) =>
              updateSettings({
                ...settings,

                timezone: value,
              })
            }
            onAutoRefreshToggle={() =>
              updateSettings({
                ...settings,

                autoRefresh: !settings.autoRefresh,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
