import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";

import sessionManager from "./session-manager";

type Props = {
  children: ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const authenticated = sessionManager.isAuthenticated();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;
