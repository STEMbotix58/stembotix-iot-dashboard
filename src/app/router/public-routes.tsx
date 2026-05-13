import { Navigate } from "react-router-dom";
import { authService } from "@/features/authentication/services/auth.service";

type Props = {
  children: React.ReactNode;
};

const PublicRoute = ({ children }: Props) => {
  const auth = authService.getAuth();

  if (auth?.token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
