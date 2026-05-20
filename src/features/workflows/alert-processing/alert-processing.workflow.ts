import loggerService from "@/core/services/logger.service";
import notificationService from "@/core/services/notification.service";

class AlertProcessingWorkflow {
  process(alert: { title: string; severity: string; description: string }) {
    loggerService.warn("Processing alert", alert);

    if (alert.severity === "critical") {
      notificationService.error(alert.title);
    }

    if (alert.severity === "warning") {
      notificationService.warning(alert.title);
    }

    if (alert.severity === "info") {
      notificationService.info(alert.title);
    }
  }
}

export default new AlertProcessingWorkflow();
