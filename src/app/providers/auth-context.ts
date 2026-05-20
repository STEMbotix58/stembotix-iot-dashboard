import { createContext, useContext } from "react";

type AuthContextType = {
  token: string | null;
  authenticated: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
};
