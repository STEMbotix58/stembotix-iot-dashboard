export const deviceStatusService = {
  getStatusColor(status: string) {
    switch (status) {
      case "Online":
        return "bg-green-100 text-green-700";

      case "Offline":
        return "bg-red-100 text-red-700";

      case "Maintenance":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  },
};
