import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";

import { authService } from "../services/auth.service";
import { loginStart, loginSuccess, loginFailed } from "../store/auth.slice";

import notificationService from "@/core/services/notification.service";
import type { AppDispatch } from "@/app/store";

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    dispatch(loginStart());

    try {
      const response = await authService.login({
        email,
        password,
      });

      dispatch(loginSuccess(response));

      notificationService.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? (error.response?.data?.message ?? error.message)
          : "Login failed";

      dispatch(loginFailed(message));

      notificationService.error(message);
    }
  };

  return { login };
};
