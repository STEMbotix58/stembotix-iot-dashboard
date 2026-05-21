import { AxiosError, type AxiosResponse } from "axios";

const responseSuccess = (response: AxiosResponse) => response;

const responseError = (error: AxiosError) => {
  if (error.response?.status === 401) {
    localStorage.clear();

    window.location.href = "/login";
  }

  return Promise.reject(error);
};

export { responseSuccess, responseError };
