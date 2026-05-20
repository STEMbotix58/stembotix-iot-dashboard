type Permission =
  | "device:read"
  | "device:write"
  | "telemetry:read"
  | "analytics:view"
  | "settings:update";

class PermissionManager {
  private permissions: Permission[] = [];

  setPermissions(permissions: Permission[]) {
    this.permissions = permissions;
  }

  has(permission: Permission) {
    return this.permissions.includes(permission);
  }

  hasAny(permissions: Permission[]) {
    return permissions.some((permission) =>
      this.permissions.includes(permission),
    );
  }
}

export default new PermissionManager();
