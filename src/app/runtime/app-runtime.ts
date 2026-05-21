import { store } from "@/app/store";
import RuntimeLifecycleManager from "@/app/runtime/runtime-lifecycle.manager";
import runtimeHealthMonitor from "@/app/runtime/runtime-health.monitor";
import runtimeLogger from "@/app/runtime/runtime-logger.service";
import runtimeSubscriptionManager from "@/app/runtime/runtime-subscription.manager";
import websocketClient from "@/core/api/websocket-client";
import eventBus from "@/core/events/event-bus";
import RUNTIME_EVENTS from "@/core/events/runtime-events";
import mqttClient from "@/core/mqtt/mqtt-client";
import mqttManager from "@/core/mqtt/mqtt-manager";
import reconnectHandler from "@/core/offline/reconnect-handler";
import alertEngine from "@/features/alerts/services/alert-engine.service";
import automationEngine from "@/features/automation/services/automation-engine.service";
import commandSocket from "@/features/controls/websocket/command.socket";
import { setDevices } from "@/features/devices/store/devices.slice";
import deviceRuntimeManager from "@/features/devices/runtime/device-runtime.manager";
import telemetryMqttRuntime from "@/features/telemetry/mqtt/telemetry.mqtt";
import telemetryEngine from "@/features/telemetry/services/telemetry-engine.service";
import telemetrySocket from "@/features/telemetry/websocket/telemetry.socket";
import realtimeStreamWorkflow from "@/features/workflows/realtime-streaming/realtime-stream.workflow";

class AppRuntime {
  private initialized = false;

  private startupPromise: Promise<void> | null = null;

  private lifecycle = new RuntimeLifecycleManager();

  constructor() {
    this.registerLifecycleTasks();
  }

  initialize() {
    if (this.initialized) {
      return Promise.resolve();
    }

    if (this.startupPromise) {
      return this.startupPromise;
    }

    runtimeLogger.info("bootstrap", "Initializing IoT runtime");

    this.startupPromise = this.lifecycle
      .startAll()
      .then(() => {
        this.initialized = true;
        runtimeLogger.info("bootstrap", "IoT runtime initialized");
      })
      .catch((error) => {
        this.initialized = false;
        runtimeLogger.error("bootstrap", "IoT runtime initialization failed", error);
      })
      .finally(() => {
        this.startupPromise = null;
      });

    return this.startupPromise;
  }

  async shutdown() {
    if (!this.initialized && !this.startupPromise) return;

    runtimeLogger.info("bootstrap", "Shutting down IoT runtime");
    await this.lifecycle.stopAll();
    this.initialized = false;
  }

  isInitialized() {
    return this.initialized;
  }

  private registerLifecycleTasks() {
    this.lifecycle.register({
      name: "runtime-event-routing",
      start: () => this.initializeRuntimeEventRouting(),
      stop: () => runtimeSubscriptionManager.disposeAll("app-runtime:"),
      critical: true,
    });

    this.lifecycle.register({
      name: "reconnect-orchestration",
      start: () => {
        reconnectHandler.initialize();
        runtimeSubscriptionManager.register(
          "app-runtime:network-reconnect",
          reconnectHandler.onReconnect(() => {
            mqttClient.connect();
            websocketClient.connect();
          }),
        );
      },
      stop: () => reconnectHandler.destroy(),
      critical: true,
    });

    this.lifecycle.register({
      name: "mqtt-manager",
      start: () => mqttManager.initialize(),
      stop: () => mqttManager.destroy(),
      critical: true,
    });

    this.lifecycle.register({
      name: "telemetry-engine",
      start: () => telemetryEngine.initialize(),
      stop: () => telemetryEngine.destroy(),
      critical: true,
    });

    this.lifecycle.register({
      name: "alert-engine",
      start: () => alertEngine.initialize(),
      stop: () => alertEngine.destroy(),
    });

    this.lifecycle.register({
      name: "automation-engine",
      start: () => automationEngine.initialize(),
      stop: () => automationEngine.destroy(),
    });

    this.lifecycle.register({
      name: "realtime-stream-workflow",
      start: () => realtimeStreamWorkflow.initialize(),
      stop: () => realtimeStreamWorkflow.destroy(),
    });

    this.lifecycle.register({
      name: "device-runtime",
      start: async () => {
        await deviceRuntimeManager.initialize();
        this.syncDevicesToStore();
      },
    });

    this.lifecycle.register({
      name: "telemetry-websocket-adapter",
      start: () => telemetrySocket.initialize(),
      stop: () => telemetrySocket.destroy(),
      critical: true,
    });

    this.lifecycle.register({
      name: "command-websocket-adapter",
      start: () => commandSocket.initialize(),
      stop: () => commandSocket.destroy(),
    });

    this.lifecycle.register({
      name: "telemetry-mqtt-adapter",
      start: () => telemetryMqttRuntime.initialize(),
      stop: () => telemetryMqttRuntime.destroy(),
      critical: true,
    });

    this.lifecycle.register({
      name: "mqtt-transport",
      start: () => {
        mqttClient.connect();
      },
      stop: () => mqttClient.disconnect(true),
      critical: true,
    });

    this.lifecycle.register({
      name: "websocket-transport",
      start: () => {
        websocketClient.connect();
      },
      stop: () => websocketClient.disconnect(),
      critical: true,
    });
  }

  private initializeRuntimeEventRouting() {
    this.registerRuntimeEvent(RUNTIME_EVENTS.MQTT_CONNECTED, () => {
      runtimeHealthMonitor.markHealthy("mqtt");
    });
    this.registerRuntimeEvent(RUNTIME_EVENTS.MQTT_RECONNECTING, () => {
      runtimeHealthMonitor.markStarting("mqtt");
    });
    this.registerRuntimeEvent(RUNTIME_EVENTS.MQTT_DISCONNECTED, () => {
      runtimeHealthMonitor.markStopped("mqtt");
    });
    this.registerRuntimeEvent(RUNTIME_EVENTS.MQTT_ERROR, (error) => {
      runtimeHealthMonitor.markDegraded("mqtt", error);
    });

    this.registerRuntimeEvent(RUNTIME_EVENTS.WEBSOCKET_CONNECTED, () => {
      runtimeHealthMonitor.markHealthy("websocket");
    });
    this.registerRuntimeEvent(RUNTIME_EVENTS.WEBSOCKET_DISCONNECTED, () => {
      runtimeHealthMonitor.markStopped("websocket");
    });
    this.registerRuntimeEvent(RUNTIME_EVENTS.WEBSOCKET_ERROR, (error) => {
      runtimeHealthMonitor.markDegraded("websocket", error);
    });

    this.registerRuntimeEvent(RUNTIME_EVENTS.NETWORK_ONLINE, () => {
      runtimeHealthMonitor.markHealthy("network");
    });
    this.registerRuntimeEvent(RUNTIME_EVENTS.NETWORK_OFFLINE, () => {
      runtimeHealthMonitor.markDegraded("network", "Browser is offline");
    });

    this.registerRuntimeEvent(RUNTIME_EVENTS.DEVICE_RUNTIME_READY, () => {
      this.syncDevicesToStore();
    });
    this.registerRuntimeEvent(RUNTIME_EVENTS.DEVICE_UPDATED, () => {
      this.syncDevicesToStore();
    });
    this.registerRuntimeEvent(RUNTIME_EVENTS.TELEMETRY_INVALID, (payload) => {
      runtimeHealthMonitor.markDegraded("telemetry-normalization", payload);
    });
    this.registerRuntimeEvent(RUNTIME_EVENTS.TELEMETRY_PROCESSED, () => {
      runtimeHealthMonitor.markHealthy("telemetry-runtime");
    });
  }

  private registerRuntimeEvent(
    eventName: string,
    handler: (payload: unknown) => void,
  ) {
    runtimeSubscriptionManager.register(
      `app-runtime:event:${eventName}`,
      eventBus.on(eventName, handler),
    );
  }

  private syncDevicesToStore() {
    store.dispatch(setDevices(deviceRuntimeManager.listDevices()));
  }
}

const appRuntime = new AppRuntime();

export default appRuntime;
