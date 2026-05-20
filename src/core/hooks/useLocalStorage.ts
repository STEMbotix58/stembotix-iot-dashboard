import { useEffect, useState } from "react";

import storageService from "@/core/services/storage.service";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    return storageService.get<T>(key) ?? initialValue;
  });

  useEffect(() => {
    storageService.set(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
