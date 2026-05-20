import mqtt from "mqtt";

import socketConfig from "@/core/config/socket.config";

const mqttClient = mqtt.connect(socketConfig.mqtt.url, {
  reconnectPeriod: socketConfig.mqtt.reconnectPeriod,

  connectTimeout: socketConfig.mqtt.connectTimeout,

  clean: socketConfig.mqtt.clean,
});

export default mqttClient;
