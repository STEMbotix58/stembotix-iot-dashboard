import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";

type UserRole = "admin" | "operator" | "viewer";

type Props = {
  children: ReactNode;
  allowedRoles: UserRole[];
};

const RoleGuard = ({ children, allowedRoles }: Props) => {
  const role = localStorage.getItem("role") ?? "viewer";

  const allowed = allowedRoles.includes(role as UserRole);

  if (!allowed) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleGuard;
