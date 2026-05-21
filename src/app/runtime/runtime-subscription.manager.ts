type Cleanup = () => void;

class RuntimeSubscriptionManager {
  private cleanups = new Map<string, Cleanup>();

  register(key: string, cleanup: Cleanup) {
    if (this.cleanups.has(key)) {
      return false;
    }

    this.cleanups.set(key, cleanup);
    return true;
  }

  replace(key: string, cleanup: Cleanup) {
    this.dispose(key);
    this.cleanups.set(key, cleanup);
  }

  has(key: string) {
    return this.cleanups.has(key);
  }

  dispose(key: string) {
    const cleanup = this.cleanups.get(key);

    if (!cleanup) return;

    cleanup();
    this.cleanups.delete(key);
  }

  disposeAll(prefix?: string) {
    Array.from(this.cleanups.keys()).forEach((key) => {
      if (!prefix || key.startsWith(prefix)) {
        this.dispose(key);
      }
    });
  }

  size() {
    return this.cleanups.size;
  }
}

export default new RuntimeSubscriptionManager();
