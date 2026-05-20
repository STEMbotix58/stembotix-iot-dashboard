type QueueItem = {
  deviceId: string;

  command: string;

  value?: unknown;

  createdAt: number;
};

class CommandQueueService {
  private queue: QueueItem[] = [];

  add(payload: Omit<QueueItem, "createdAt">) {
    this.queue.push({
      ...payload,

      createdAt: Date.now(),
    });
  }

  complete(payload: Omit<QueueItem, "createdAt">) {
    this.queue = this.queue.filter(
      (item) =>
        !(
          item.deviceId === payload.deviceId && item.command === payload.command
        ),
    );
  }

  getAll() {
    return this.queue;
  }

  clear() {
    this.queue = [];
  }
}

export default new CommandQueueService();
