import { Navigate } from "react-router-dom";
import { authService } from "@/features/authentication/services/auth.service";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const auth = authService.getAuth();

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
