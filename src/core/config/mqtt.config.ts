import env from "./env.config";

const mqttConfig = {
  brokerUrl: env.MQTT_URL,

  options: {
    clientId: `iot-dashboard-${Math.random().toString(16).slice(2)}`,

    reconnectPeriod: 3000,

    clean: true,

    resubscribe: false,

    connectTimeout: 10000,
  },
};

export default mqttConfig;
