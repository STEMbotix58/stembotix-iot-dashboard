import storageService from "@/core/services/storage.service";
import { APP_CONSTANTS } from "@/core/constants/app.constants";

const TOKEN_KEY = APP_CONSTANTS.STORAGE_KEYS.AUTH;

type AuthStorage = {
  token: string;
  refreshToken?: string;
};

class TokenManager {
  getToken(): string | null {
    const auth = storageService.get<AuthStorage>(TOKEN_KEY);

    return auth?.token ?? null;
  }

  setToken(token: string) {
    const auth = storageService.get<AuthStorage>(TOKEN_KEY);

    storageService.set(TOKEN_KEY, {
      ...auth,
      token,
    });
  }

  clear() {
    storageService.remove(TOKEN_KEY);
  }
}

export default new TokenManager();
