import tokenManager from "./token-manager";

class SessionManager {
  isAuthenticated() {
    return !!tokenManager.getToken();
  }

  start(token: string) {
    tokenManager.setToken(token);
  }

  destroy() {
    tokenManager.clear();

    localStorage.clear();
  }
}

export default new SessionManager();
