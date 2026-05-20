export type ControlCommand = {
  id: string;
  deviceId: string;
  command: string;
  value?: unknown;
  status: "pending" | "success" | "failed";
  createdAt: number;
};

export type ControlsState = {
  commands: ControlCommand[];
  loading: boolean;
  error: string | null;
};
