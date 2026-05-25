import { alertsApi } from "../api/alerts.api";
import loggerService from "@/core/services/logger.service";

class AlertsService {
  async fetchAlerts() {
    try {
      const response = await alertsApi.getAlerts();
      return response.data;
    } catch (error) {
      loggerService.error("Failed to fetch alerts", error);
      throw error;
    }
  }

  async fetchAlertsPaginated(params?: {
    page?: number;
    page_size?: number;
    search?: string;
    ordering?: string;
  }) {
    try {
      const response = await alertsApi.getAlertsPaginated(params);
      return response;
    } catch (error) {
      loggerService.error("Failed to fetch paginated alerts", error);
      throw error;
    }
  }

  sortBySeverity(
    alerts: {
      severity: string;
    }[],
  ) {
    const priority = {
      critical: 3,
      warning: 2,
      info: 1,
    };
    return [...alerts].sort(
      (a, b) =>
        priority[b.severity as keyof typeof priority] -
        priority[a.severity as keyof typeof priority],
    );
  }
}

export default new AlertsService();
