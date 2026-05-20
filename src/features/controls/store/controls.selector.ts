import type { RootState } from "@/app/store";

export const selectControls = (state: RootState) => state.controls;

export const selectCommands = (state: RootState) => state.controls.commands;

export const selectPendingCommands = (state: RootState) =>
  state.controls.commands.filter((command) => command.status === "pending");

export const selectControlsLoading = (state: RootState) =>
  state.controls.loading;
