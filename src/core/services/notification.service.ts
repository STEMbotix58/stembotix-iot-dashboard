type NotificationType = "success" | "error" | "warning" | "info";

class NotificationService {
  show(type: NotificationType, message: string) {
    console.log(`[${type.toUpperCase()}]`, message);
  }

  success(message: string) {
    this.show("success", message);
  }

  error(message: string) {
    this.show("error", message);
  }

  warning(message: string) {
    this.show("warning", message);
  }

  info(message: string) {
    this.show("info", message);
  }
}

export default new NotificationService();
