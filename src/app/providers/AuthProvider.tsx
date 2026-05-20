import { type ReactNode, useEffect, useMemo, useState } from "react";

import sessionManager from "@/core/auth/session-manager";
import tokenManager from "@/core/auth/token-manager";

import { AuthContext } from "./auth-context";

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const currentToken = tokenManager.getToken();

    setToken(currentToken);
  }, []);

  const logout = () => {
    sessionManager.destroy();

    setToken(null);
  };

  const value = useMemo(
    () => ({
      token,
      authenticated: sessionManager.isAuthenticated(),
      logout,
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
