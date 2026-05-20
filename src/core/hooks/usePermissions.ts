import permissionManager from "@/core/auth/permission-manager";

const usePermissions = () => {
  return {
    hasPermission: permissionManager.has.bind(permissionManager),

    hasAnyPermission: permissionManager.hasAny.bind(permissionManager),
  };
};

export default usePermissions;
