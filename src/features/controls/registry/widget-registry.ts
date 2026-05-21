import type {
  WidgetDescriptor,
  WidgetFactory,
} from "@/features/controls/types/widget.types";
import type { Device } from "@/entities/device/device.types";
import type { TelemetryMetric } from "@/entities/telemetry/telemetry.types";

import ToggleSwitchWidget from "@/features/controls/components/widgets/ToggleSwitchWidget";
import LightControlWidget from "@/features/controls/components/widgets/LightControlWidget";
import FanSpeedSliderWidget from "@/features/controls/components/widgets/FanSpeedSliderWidget";
import RGBLightWidget from "@/features/controls/components/widgets/RGBLightWidget";
import ThermostatWidget from "@/features/controls/components/widgets/ThermostatWidget";
import DoorLockWidget from "@/features/controls/components/widgets/DoorLockWidget";
import PowerButtonWidget from "@/features/controls/components/widgets/PowerButtonWidget";
import SmartPlugWidget from "@/features/controls/components/widgets/SmartPlugWidget";
import MotionControlWidget from "@/features/controls/components/widgets/MotionControlWidget";
import EnergyGraphWidget from "@/features/controls/components/widgets/EnergyGraphWidget";
import AirQualityWidget from "@/features/controls/components/widgets/AirQualityWidget";
import GarageDoorWidget from "@/features/controls/components/widgets/GarageDoorWidget";

import { DEVICE_COMMANDS } from "@/entities/command/command.constants";
import type { DeviceControlActions } from "@/features/controls/types/widget.types";

const getMetric = (metrics: TelemetryMetric[], key: string) =>
  metrics.find((metric) => metric.key === key)?.value;

const buildSwitchWidget: WidgetFactory = (device, metrics, actions) => {
  const powerState =
    device.shadow?.reported?.power ??
    (getMetric(metrics, "power") === 1 || device.value.toLowerCase() === "on");

  return {
    key: `${device.id}-switch`,
    component: ToggleSwitchWidget,
    props: {
      enabled: Boolean(powerState),
      onToggle: async () => {
        await actions.executeCommand(
          powerState ? DEVICE_COMMANDS.TURN_OFF : DEVICE_COMMANDS.TURN_ON,
        );
      },
    },
  };
};

const buildLightWidget: WidgetFactory = (device, metrics, actions) => {
  const brightness =
    getMetric(metrics, "brightness") ??
    device.shadow?.reported?.brightness ??
    0;

  return {
    key: `${device.id}-brightness`,
    component: LightControlWidget,
    props: {
      brightness: Number(brightness),
      onChange: async (value: number) => {
        await actions.executeCommand(DEVICE_COMMANDS.SET_BRIGHTNESS, value);
      },
    },
  };
};

const buildRGBWidget: WidgetFactory = (device, metrics, actions) => {
  const color = String(
    device.shadow?.reported?.color ?? getMetric(metrics, "color") ?? "#3b82f6",
  );

  return {
    key: `${device.id}-rgb`,
    component: RGBLightWidget,
    props: {
      color,
      onChange: async (value: string) => {
        await actions.executeCommand(DEVICE_COMMANDS.SET_RGB_COLOR, value);
      },
    },
  };
};

const buildThermostatWidget: WidgetFactory = (device, metrics, actions) => {
  const temperature = Number(
    getMetric(metrics, "temperature") ??
      device.shadow?.reported?.temperature ??
      22,
  );

  return {
    key: `${device.id}-thermostat`,
    component: ThermostatWidget,
    props: {
      temperature,
      onChange: async (value: number) => {
        await actions.executeCommand(DEVICE_COMMANDS.SET_TEMPERATURE, value);
      },
    },
  };
};

const buildFanSpeedWidget: WidgetFactory = (device, metrics, actions) => {
  const speed = Number(
    getMetric(metrics, "fan_speed") ?? device.shadow?.reported?.fanSpeed ?? 0,
  );

  return {
    key: `${device.id}-fan-speed`,
    component: FanSpeedSliderWidget,
    props: {
      speed,
      onChange: async (value: number) => {
        await actions.executeCommand(DEVICE_COMMANDS.SET_FAN_SPEED, value);
      },
    },
  };
};

const buildDoorLockWidget: WidgetFactory = (device, metrics, actions) => {
  const locked = Boolean(
    device.shadow?.reported?.locked ?? getMetric(metrics, "locked") === 1,
  );

  return {
    key: `${device.id}-door-lock`,
    component: DoorLockWidget,
    props: {
      locked,
      onToggle: async () => {
        await actions.executeCommand(
          locked ? DEVICE_COMMANDS.UNLOCK_DOOR : DEVICE_COMMANDS.LOCK_DOOR,
        );
      },
    },
  };
};

const buildPowerWidget: WidgetFactory = (device, metrics, actions) => {
  const active = Boolean(
    device.shadow?.reported?.power ?? getMetric(metrics, "power") === 1,
  );

  return {
    key: `${device.id}-power-button`,
    component: PowerButtonWidget,
    props: {
      active,
      loading: actions.loading,
      onToggle: async () => {
        await actions.executeCommand(
          active ? DEVICE_COMMANDS.TURN_OFF : DEVICE_COMMANDS.TURN_ON,
        );
      },
    },
  };
};

const buildSmartPlugWidget: WidgetFactory = (device, metrics, actions) => {
  const enabled = Boolean(
    device.shadow?.reported?.enabled ?? getMetric(metrics, "enabled") === 1,
  );
  const powerUsage = Number(getMetric(metrics, "power_usage") ?? 0);

  return {
    key: `${device.id}-smart-plug`,
    component: SmartPlugWidget,
    props: {
      enabled,
      powerUsage,
      onToggle: async () => {
        await actions.executeCommand(
          enabled ? DEVICE_COMMANDS.TURN_OFF : DEVICE_COMMANDS.TURN_ON,
        );
      },
    },
  };
};

const buildMotionWidget: WidgetFactory = (device, metrics) => {
  const detected = Boolean(getMetric(metrics, "motion") === 1);

  return {
    key: `${device.id}-motion`,
    component: MotionControlWidget,
    props: {
      detected,
    },
  };
};

const buildEnergyWidget: WidgetFactory = (device, metrics) => {
  const energy = Number(getMetric(metrics, "energy") ?? 0);

  return {
    key: `${device.id}-energy`,
    component: EnergyGraphWidget,
    props: {
      energy,
    },
  };
};

const buildAirQualityWidget: WidgetFactory = (device, metrics) => {
  const aqi = Number(getMetric(metrics, "aqi") ?? 0);

  return {
    key: `${device.id}-air-quality`,
    component: AirQualityWidget,
    props: {
      aqi,
    },
  };
};

const buildGarageDoorWidget: WidgetFactory = (device, metrics, actions) => {
  const doorState = String(
    device.shadow?.reported?.doorState ??
      getMetric(metrics, "doorState") ??
      "CLOSED",
  );

  return {
    key: `${device.id}-garage-door`,
    component: GarageDoorWidget,
    props: {
      doorState,
      onToggle: async () => {
        await actions.executeCommand(
          doorState === "OPEN"
            ? DEVICE_COMMANDS.CLOSE_DOOR
            : DEVICE_COMMANDS.OPEN_DOOR,
        );
      },
    },
  };
};

const widgetFactoryMap: Record<string, WidgetFactory> = {
  switch: buildSwitchWidget,
  brightness: buildLightWidget,
  rgb: buildRGBWidget,
  temperature: buildThermostatWidget,
  fan_speed: buildFanSpeedWidget,
  lock: buildDoorLockWidget,
  power: buildPowerWidget,
  smart_plug: buildSmartPlugWidget,
  motion: buildMotionWidget,
  energy: buildEnergyWidget,
  air_quality: buildAirQualityWidget,
  door_state: buildGarageDoorWidget,
};

export const getWidgetsForDevice = (
  device: Device,
  metrics: TelemetryMetric[],
  actions: DeviceControlActions,
) => {
  return device.capabilities
    .map((capability) =>
      widgetFactoryMap[capability]?.(device, metrics, actions),
    )
    .filter(
      (widget): widget is WidgetDescriptor =>
        widget !== null && widget !== undefined,
    );
};
