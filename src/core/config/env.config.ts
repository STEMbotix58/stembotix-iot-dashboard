const env = {
  API_URL: import.meta.env.VITE_API_BASE_URL,
  WS_URL: import.meta.env.VITE_WS_URL,
  MQTT_URL: import.meta.env.VITE_MQTT_BROKER_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME,
  // NODE_ENV: import.meta.env.MODE,
};

export default env;
