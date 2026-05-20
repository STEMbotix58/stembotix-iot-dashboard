type QueueItem<T = unknown> = {
  id: string;
  payload: T;
  createdAt: number;
};

class OfflineQueue {
  private queue: QueueItem[] = [];

  add<T>(payload: T) {
    this.queue.push({
      id: crypto.randomUUID(),
      payload,
      createdAt: Date.now(),
    });
  }

  getAll() {
    return [...this.queue];
  }

  clear() {
    this.queue = [];
  }

  remove(id: string) {
    this.queue = this.queue.filter((item) => item.id !== id);
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

export default new OfflineQueue();
