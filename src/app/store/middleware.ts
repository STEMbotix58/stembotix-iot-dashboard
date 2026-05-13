import type { Middleware } from "@reduxjs/toolkit";

// You can add custom middleware here (logger, websocket, etc.)

export const middleware: Middleware[] = [];

// Example (optional logger middleware)
/*
const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log("dispatch:", action);
  return next(action);
};

export const middleware: Middleware[] = [loggerMiddleware];
*/
