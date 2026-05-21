import loggerService from "@/core/services/logger.service";

class RuntimeLoggerService {
  info(scope: string, message: string, data?: unknown) {
    loggerService.info(`[runtime:${scope}] ${message}`, data);
  }

  warn(scope: string, message: string, data?: unknown) {
    loggerService.warn(`[runtime:${scope}] ${message}`, data);
  }

  error(scope: string, message: string, data?: unknown) {
    loggerService.error(`[runtime:${scope}] ${message}`, data);
  }

  debug(scope: string, message: string, data?: unknown) {
    loggerService.debug(`[runtime:${scope}] ${message}`, data);
  }
}

export default new RuntimeLoggerService();
