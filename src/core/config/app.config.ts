import env from "./env.config";

const appConfig = {
  name: env.APP_NAME,

  pagination: {
    pageSize: 10,
    pageSizeOptions: [10, 25, 50],
  },

  telemetry: {
    refreshInterval: 5000,
  },

  notifications: {
    duration: 4000,
  },

  auth: {
    tokenKey: "auth",
  },
};

export default appConfig;
