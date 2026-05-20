export type WebSocketEvent<T = unknown> = {
  event: string;
  payload: T;
};

export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

export type TelemetryPayload = {
  deviceId: string;

  timestamp: string;

  metrics: Record<string, number>;
};

export type DeviceStatusPayload = {
  deviceId: string;

  status: "online" | "offline";
};

export type SocketMessage<T = unknown> = {
  type: string;

  data: T;
};
