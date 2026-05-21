import type { ComponentType } from "react";
import type { Device } from "@/entities/device/device.types";
import type { TelemetryMetric } from "@/entities/telemetry/telemetry.types";

export type DeviceControlActions = {
  executeCommand: (
    command: string,
    value?: string | number | boolean,
  ) => Promise<void>;
  loading: boolean;
};

export type WidgetDescriptor = {
  key: string;
  component: ComponentType<any>;
  props: Record<string, unknown>;
};

export type WidgetFactory = (
  device: Device,
  metrics: TelemetryMetric[],
  actions: DeviceControlActions,
) => WidgetDescriptor | null;
