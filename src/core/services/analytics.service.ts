import loggerService from "./logger.service";

type AnalyticsEvent = {
  event: string;
  properties?: Record<string, unknown>;
};

class AnalyticsService {
  track({ event, properties }: AnalyticsEvent) {
    loggerService.info(`Analytics: ${event}`, properties);
  }

  pageView(page: string) {
    this.track({
      event: "page_view",
      properties: {
        page,
      },
    });
  }

  deviceAction(deviceId: string, action: string) {
    this.track({
      event: "device_action",
      properties: {
        deviceId,
        action,
      },
    });
  }
}

export default new AnalyticsService();
