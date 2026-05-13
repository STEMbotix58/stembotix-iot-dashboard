import axios from "axios";
import type { LoginPayload, LoginResponse } from "../store/auth.types";

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    // Real API later
    // const { data } = await axios.post("/api/auth/login", payload);
    // return data;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          payload.email === "user@example.com" &&
          payload.password === "password"
        ) {
          resolve({
            token: "aa--qq--ww",
            user: {
              id: "1",
              email: payload.email,
              name: "Example User",
              role: "admin",
            },
          });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  },
};
