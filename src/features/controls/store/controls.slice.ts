import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ControlsState, ControlCommand } from "./controls.types";

const initialState: ControlsState = {
  commands: [],
  loading: false,
  error: null,
};

const controlsSlice = createSlice({
  name: "controls",
  initialState,
  reducers: {
    commandStarted(state, action: PayloadAction<ControlCommand>) {
      state.loading = true;
      state.commands.push(action.payload);
    },

    commandSucceeded(state, action: PayloadAction<string>) {
      state.loading = false;
      const command = state.commands.find((item) => item.id === action.payload);
      if (command) {
        command.status = "success";
      }
    },

    commandFailed(
      state,
      action: PayloadAction<{
        id: string;
        error: string;
      }>,
    ) {
      state.loading = false;
      state.error = action.payload.error;
      const command = state.commands.find(
        (item) => item.id === action.payload.id,
      );
      if (command) {
        command.status = "failed";
      }
    },

    clearCommands(state) {
      state.commands = [];
    },
  },
});

export const {
  commandStarted,
  commandSucceeded,
  commandFailed,
  clearCommands,
} = controlsSlice.actions;

export default controlsSlice.reducer;
