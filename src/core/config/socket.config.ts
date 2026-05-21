import env from "./env.config";

const socketConfig = {
  websocket: {
    url: env.WS_URL,
    reconnect: true,
    reconnectDelay: 3000,
    maxRetries: 10,
  },

  mqtt: {
    url: env.MQTT_URL,
    reconnectPeriod: 5000,
    clean: true,
    connectTimeout: 10000,
  },
};

export default socketConfig;
