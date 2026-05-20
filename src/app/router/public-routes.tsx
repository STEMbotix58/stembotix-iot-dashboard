import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "@/core/constants/routes.constants";

import sessionManager from "@/core/auth/session-manager";

type Props = {
  children: ReactNode;
};

const PublicRoutes = ({ children }: Props) => {
  const authenticated = sessionManager.isAuthenticated();

  if (authenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
};

export default PublicRoutes;
