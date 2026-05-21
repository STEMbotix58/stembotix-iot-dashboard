export type QueueItem<T = unknown> = {
  id: string;
  payload: T;
  createdAt: number;
};

class OfflineQueue {
  private queue: QueueItem[] = [];

  private maxSize = 500;

  add<T>(payload: T) {
    if (this.queue.length >= this.maxSize) {
      this.queue.shift();
    }

    const item = {
      id: crypto.randomUUID(),
      payload,
      createdAt: Date.now(),
    };

    this.queue.push(item);

    return item;
  }

  getAll<T = unknown>() {
    return [...this.queue] as QueueItem<T>[];
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

  size() {
    return this.queue.length;
  }
}

export default new OfflineQueue();
