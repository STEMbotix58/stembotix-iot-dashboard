import { RouterProvider } from "react-router-dom";

import router from "./router";

import AuthProvider from "./providers/AuthProvider";
import ThemeProvider from "./providers/ThemeProvider";
import StoreProvider from "./providers/StoreProvider";
import SocketProvider from "./providers/SocketProvider";
import QueryProvider from "./providers/QueryProvider";
import realtimeStreamWorkflow from "@/features/workflows/realtime-streaming/realtime-stream.workflow";

const App = () => {
  realtimeStreamWorkflow.initialize();

  return (
    <StoreProvider>
      <ThemeProvider>
        <AuthProvider>
          <SocketProvider>
            <QueryProvider>
              <RouterProvider router={router} />
            </QueryProvider>
          </SocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
