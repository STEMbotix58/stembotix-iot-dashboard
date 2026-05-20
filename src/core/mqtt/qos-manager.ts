export enum MQTT_QOS {
  AT_MOST_ONCE = 0,
  AT_LEAST_ONCE = 1,
  EXACTLY_ONCE = 2,
}

export const qosManager = {
  telemetry: MQTT_QOS.AT_MOST_ONCE,

  command: MQTT_QOS.AT_LEAST_ONCE,

  alerts: MQTT_QOS.EXACTLY_ONCE,
};
