import { type ReactNode } from "react";
import AuthGuard from "@/core/auth/auth-guard";

type Props = {
  children: ReactNode;
};

const ProtectedRoutes = ({ children }: Props) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default ProtectedRoutes;
