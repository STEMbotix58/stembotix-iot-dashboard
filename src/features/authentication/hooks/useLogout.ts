import { useDispatch } from "react-redux";
import { logout } from "../store/auth.slice";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    authService.clearAuth();

    dispatch(logout());

    navigate("/login", { replace: true });
  };

  return { logoutUser };
};
