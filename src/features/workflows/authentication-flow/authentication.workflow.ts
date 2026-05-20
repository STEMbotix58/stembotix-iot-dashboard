import { authService } from "@/features/authentication/services/auth.service";
import sessionManager from "@/core/auth/session-manager";
import loggerService from "@/core/services/logger.service";

class AuthenticationWorkflow {
  async login(email: string, password: string) {
    const response = await authService.login({
      email,
      password,
    });
    sessionManager.start(response.token);
    loggerService.info("User authenticated", response.user);
    return response;
  }

  logout() {
    sessionManager.destroy();
    loggerService.info("User logged out");
  }
}

export default new AuthenticationWorkflow();
