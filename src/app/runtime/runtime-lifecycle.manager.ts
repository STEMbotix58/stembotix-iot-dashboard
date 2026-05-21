import runtimeHealthMonitor from "./runtime-health.monitor";
import runtimeLogger from "./runtime-logger.service";

type RuntimeTask = {
  name: string;
  start: () => void | Promise<void>;
  stop?: () => void | Promise<void>;
  critical?: boolean;
};

class RuntimeLifecycleManager {
  private tasks = new Map<string, RuntimeTask>();

  private started = false;

  private starting = false;

  register(task: RuntimeTask) {
    this.tasks.set(task.name, task);
  }

  async startAll() {
    if (this.started || this.starting) return;

    this.starting = true;
    const startedTasks: RuntimeTask[] = [];

    for (const task of this.tasks.values()) {
      runtimeHealthMonitor.markStarting(task.name);

      try {
        await task.start();
        startedTasks.push(task);
        runtimeHealthMonitor.markHealthy(task.name);
      } catch (error) {
        runtimeHealthMonitor.markDegraded(task.name, error);
        runtimeLogger.error(task.name, "Startup failed", error);

        if (task.critical) {
          await this.stopStartedTasks(startedTasks);
          this.starting = false;
          throw error;
        }
      }
    }

    this.started = true;
    this.starting = false;
  }

  private async stopStartedTasks(startedTasks: RuntimeTask[]) {
    for (const task of startedTasks.reverse()) {
      if (!task.stop) continue;

      try {
        await task.stop();
        runtimeHealthMonitor.markStopped(task.name);
      } catch (error) {
        runtimeHealthMonitor.markDegraded(task.name, error);
      }
    }
  }

  async stopAll() {
    if (!this.started) return;

    const tasks = Array.from(this.tasks.values()).reverse();

    for (const task of tasks) {
      if (!task.stop) {
        runtimeHealthMonitor.markStopped(task.name);
        continue;
      }

      try {
        await task.stop();
        runtimeHealthMonitor.markStopped(task.name);
      } catch (error) {
        runtimeHealthMonitor.markDegraded(task.name, error);
        runtimeLogger.error(task.name, "Shutdown failed", error);
      }
    }

    this.started = false;
  }

  isStarted() {
    return this.started;
  }
}

export default RuntimeLifecycleManager;
