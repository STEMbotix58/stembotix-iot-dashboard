import loggerService from "@/core/services/logger.service";

export type EventHandler<TPayload = unknown> = (
  payload: TPayload,
) => void | Promise<void>;

class EventBus {
  private listeners = new Map<string, Set<EventHandler>>();

  on<TPayload = unknown>(
    eventName: string,
    handler: EventHandler<TPayload>,
  ) {
    const handlers = this.listeners.get(eventName) ?? new Set<EventHandler>();

    handlers.add(handler as EventHandler);
    this.listeners.set(eventName, handlers);

    return () => this.off(eventName, handler);
  }

  once<TPayload = unknown>(
    eventName: string,
    handler: EventHandler<TPayload>,
  ) {
    const unsubscribe = this.on<TPayload>(eventName, async (payload) => {
      unsubscribe();
      await handler(payload);
    });

    return unsubscribe;
  }

  off<TPayload = unknown>(
    eventName: string,
    handler: EventHandler<TPayload>,
  ) {
    const handlers = this.listeners.get(eventName);

    if (!handlers) return;

    handlers.delete(handler as EventHandler);

    if (!handlers.size) {
      this.listeners.delete(eventName);
    }
  }

  emit<TPayload = unknown>(eventName: string, payload: TPayload) {
    const handlers = Array.from(this.listeners.get(eventName) ?? []);

    handlers.forEach((handler) => {
      Promise.resolve(handler(payload)).catch((error) => {
        loggerService.error(`[event-bus] ${eventName} handler failed`, error);
      });
    });
  }

  async emitAsync<TPayload = unknown>(eventName: string, payload: TPayload) {
    const handlers = Array.from(this.listeners.get(eventName) ?? []);

    await Promise.allSettled(handlers.map((handler) => handler(payload)));
  }

  listenerCount(eventName: string) {
    return this.listeners.get(eventName)?.size ?? 0;
  }

  clear(eventName?: string) {
    if (eventName) {
      this.listeners.delete(eventName);
      return;
    }

    this.listeners.clear();
  }
}

const eventBus = new EventBus();

export default eventBus;
