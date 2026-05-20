import { analyticsApi } from "../api/analytics.api";
import loggerService from "@/core/services/logger.service";

class AnalyticsService {
  async getDashboardAnalytics() {
    try {
      const response = await analyticsApi.getOverview();
      return response.data;
    } catch (error) {
      loggerService.error("Failed to fetch analytics", error);
      throw error;
    }
  }

  calculateAverage(values: number[]) {
    if (!values.length) {
      return 0;
    }

    const total = values.reduce((sum, value) => sum + value, 0);
    return total / values.length;
  }

  detectAnomaly(value: number, threshold: number) {
    return value > threshold;
  }
}

export default new AnalyticsService();
