import eventBus from "@/core/events/event-bus";
import RUNTIME_EVENTS from "@/core/events/runtime-events";

export type RuntimeHealthStatus =
  | "idle"
  | "starting"
  | "healthy"
  | "degraded"
  | "stopped";

export type RuntimeComponentHealth = {
  name: string;
  status: RuntimeHealthStatus;
  lastChangedAt: string;
  error?: string;
  metadata?: Record<string, unknown>;
};

export type RuntimeHealthSnapshot = {
  updatedAt: string;
  components: RuntimeComponentHealth[];
};

class RuntimeHealthMonitor {
  private components = new Map<string, RuntimeComponentHealth>();

  markStarting(name: string, metadata?: Record<string, unknown>) {
    this.update(name, "starting", undefined, metadata);
  }

  markHealthy(name: string, metadata?: Record<string, unknown>) {
    this.update(name, "healthy", undefined, metadata);
  }

  markDegraded(
    name: string,
    error: unknown,
    metadata?: Record<string, unknown>,
  ) {
    this.update(name, "degraded", this.stringifyError(error), metadata);
  }

  markStopped(name: string, metadata?: Record<string, unknown>) {
    this.update(name, "stopped", undefined, metadata);
  }

  getSnapshot(): RuntimeHealthSnapshot {
    return {
      updatedAt: new Date().toISOString(),
      components: Array.from(this.components.values()),
    };
  }

  private update(
    name: string,
    status: RuntimeHealthStatus,
    error?: string,
    metadata?: Record<string, unknown>,
  ) {
    this.components.set(name, {
      name,
      status,
      lastChangedAt: new Date().toISOString(),
      error,
      metadata,
    });

    eventBus.emit(RUNTIME_EVENTS.RUNTIME_HEALTH_CHANGED, this.getSnapshot());
  }

  private stringifyError(error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }

    return String(error);
  }
}

export default new RuntimeHealthMonitor();
