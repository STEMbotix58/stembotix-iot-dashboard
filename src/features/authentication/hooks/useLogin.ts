import { useDispatch } from "react-redux";
import { authService } from "../services/auth.service";
import { loginStart, loginSuccess, loginFailed } from "../store/auth.slice";

import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    dispatch(loginStart());

    try {
      const res = await authService.login({ email, password });

      dispatch(loginSuccess(res));

      navigate("/dashboard");
    } catch (err: any) {
      dispatch(loginFailed(err?.message || "Login failed"));
    }
  };

  return { login };
};
