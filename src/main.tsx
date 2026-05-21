import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/app/App";
import appRuntime from "@/app/runtime/app-runtime";

import "@/styles/tailwind.css";
import "@/styles/theme.css";
import "@/styles/animations.css";
import "@/styles/globals.css";

void appRuntime.initialize();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
