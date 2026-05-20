import { AxiosError } from "axios";

const responseSuccess = (response: unknown) => response;

const responseError = (error: AxiosError) => {
  if (error.response?.status === 401) {
    localStorage.clear();

    window.location.href = "/login";
  }

  return Promise.reject(error);
};

export { responseSuccess, responseError };
