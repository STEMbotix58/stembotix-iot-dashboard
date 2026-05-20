import { useEffect, useState } from "react";

import commandQueueService from "../services/command-queue.service";

const useCommandStatus = () => {
  const [commands, setCommands] = useState(commandQueueService.getAll());

  useEffect(() => {
    const interval = setInterval(() => {
      setCommands([...commandQueueService.getAll()]);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return {
    commands,
    pendingCount: commands.length,
  };
};

export default useCommandStatus;
