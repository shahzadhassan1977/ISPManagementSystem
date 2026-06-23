export type AuthUser = {
  sub?: string;
  email?: string;
  exp?: number;
  roles?: Array<string | { name?: string; role?: { name?: string } }>;
  permissions?: Array<string | { name?: string; permission?: { name?: string } }>;
  userRoles?: Array<{
    role?: {
      name?: string;
      rolePermissions?: Array<{
        permission?: {
          name?: string;
        };
      }>;
    };
  }>;
  rolePermissions?: Array<{
    permission?: {
      name?: string;
    };
  }>;
  [key: string]: unknown;
};

function safeDecodeBase64(value: string) {
  try {
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );

    const binary = atob(padded);
    const utf8 = binary
      .split("")
      .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
      .join("");

    return decodeURIComponent(utf8);
  } catch {
    return null;
  }
}

export const parseJwt = (token: string): AuthUser | null => {
  if (!token || token.split(".").length !== 3) {
    return null;
  }

  const payload = token.split(".")[1];
  const decoded = safeDecodeBase64(payload);

  if (!decoded) {
    return null;
  }

  try {
    return JSON.parse(decoded) as AuthUser;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = parseJwt(token);
  if (!payload) {
    return true;
  }

  if (!payload.exp) {
    return false;
  }

  const expirationTime = payload.exp * 1000;
  return Date.now() >= expirationTime;
};

export const getTokenFromCookie = () => {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("access_token="));

  return match ? decodeURIComponent(match.split("=")[1] || "") : null;
};

export const normalizePermission = (permission?: string) =>
  permission?.toString().trim().toLowerCase() || "";

const hasAnyPermission = (
  user: AuthUser | null | undefined,
  permissions: string[],
) => permissions.some((permission) => hasPermission(user, permission));

const collectRoleNames = (user: AuthUser | null | undefined) => {
  if (!user) {
    return [];
  }

  const directRoles = Array.isArray(user.roles)
    ? user.roles
        .map((role) => {
          if (typeof role === "string") {
            return role;
          }

          return role?.name ?? role?.role?.name;
        })
        .filter(Boolean)
    : [];

  const nestedRoles = Array.isArray(user.userRoles)
    ? user.userRoles
        .map((userRole) => userRole?.role?.name)
        .filter(Boolean)
    : [];

  return [...directRoles, ...nestedRoles].map((role) =>
    normalizePermission(role),
  );
};

const collectPermissionNames = (user: AuthUser | null | undefined) => {
  if (!user) {
    return [];
  }

  const directPermissions = Array.isArray(user.permissions)
    ? user.permissions
        .map((permission) => {
          if (typeof permission === "string") {
            return permission;
          }

          return permission?.name ?? permission?.permission?.name;
        })
        .filter(Boolean)
    : [];

  const rolePermissions = Array.isArray(user.rolePermissions)
    ? user.rolePermissions
        .map((rolePermission) => rolePermission?.permission?.name)
        .filter(Boolean)
    : [];

  const userRolePermissions = Array.isArray(user.userRoles)
    ? user.userRoles.flatMap((userRole) =>
        Array.isArray(userRole?.role?.rolePermissions)
          ? userRole.role.rolePermissions
              .map((rolePermission) => rolePermission?.permission?.name)
              .filter(Boolean)
          : [],
      )
    : [];

  return [
    ...directPermissions,
    ...rolePermissions,
    ...userRolePermissions,
  ].map((permission) => normalizePermission(permission));
};

export const hasRole = (user: AuthUser | null | undefined, roleName?: string) => {
  if (!user || !roleName) {
    return false;
  }

  const normalized = normalizePermission(roleName);
  return collectRoleNames(user).includes(normalized);
};

export const hasPermission = (
  user: AuthUser | null | undefined,
  permission?: string,
) => {
  if (!user || !permission) {
    return false;
  }

  const normalized = normalizePermission(permission);
  return collectPermissionNames(user).includes(normalized);
};

export const isAdminUser = (user: AuthUser | null | undefined) => {
  if (!user) {
    return false;
  }

  const roleAdmin = hasRole(user, "admin");
  const permissionAdmin =
    hasPermission(user, "admin") ||
    hasPermission(user, "admin_access") ||
    hasPermission(user, "admin_all");

  return roleAdmin || permissionAdmin;
};

export const getPagePermissionFromPathname = (pathname: string) => {
  const path = pathname.split("?")[0].split("#")[0].toLowerCase();

  const mapping: Record<string, string> = {
    "/dashboard": "dashboard",
    "/company": "company",
    "/permission": "permission",
    "/role": "role",
    "/user": "user",
    "/employee": "employee",
    "/area": "area",
    "/subarea": "subarea",
    "/customer": "customer",
    "/product": "product",
    "/subscription": "subscription",
    "/payment": "payment",
    "/reports": "reports",
    "/repcustomerinvoice": "repCustomerInvoice",
    "/setting": "setting",
    "/reports/daily": "reportdaily",
    "/reports/monthly": "reportmonthly",
    "/reports/yearly": "reportyearly",
    "/reports/employee-wise": "reportemployee-wise",
    "/reports/product-wise": "reportproduct-wise",
  };

  if (mapping[path]) {
    return mapping[path];
  }

  const segments = path.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "dashboard";
  }

  return segments.join("");
};

export const canAccessPage = (
  user: AuthUser | null | undefined,
  pathnameOrPermission: string,
) => {
  if (!user) {
    return false;
  }

  if (isAdminUser(user)) {
    return true;
  }

  if (pathnameOrPermission.startsWith("/")) {
    const permission = getPagePermissionFromPathname(pathnameOrPermission);
    return hasAnyPermission(user, [
      permission,
      `${permission}_view`,
      `${permission}_read`,
      `${permission}_access`,
      `view_${permission}`,
      `read_${permission}`,
    ]);
  }

  return hasAnyPermission(user, [
    pathnameOrPermission,
    `${pathnameOrPermission}_view`,
    `${pathnameOrPermission}_read`,
    `${pathnameOrPermission}_access`,
    `view_${pathnameOrPermission}`,
    `read_${pathnameOrPermission}`,
  ]);
};

export const canPerformAction = (
  user: AuthUser | null | undefined,
  pagePermission: string | undefined,
  action?: string,
) => {
  if (!pagePermission) {
    return false;
  }

  if (isAdminUser(user)) {
    return true;
  }

  const normalizedPage = normalizePermission(pagePermission);
  const normalizedAction = action ? normalizePermission(action) : "add";
  const actionAliases: Record<string, string[]> = {
    add: ["add", "create"],
    create: ["create", "add"],
    edit: ["edit", "update"],
    update: ["update", "edit"],
    delete: ["delete", "remove"],
    remove: ["remove", "delete"],
    view: ["view", "read"],
    read: ["read", "view"],
  };

  const actions = actionAliases[normalizedAction] ?? [normalizedAction];
  const permissionNames = actions.flatMap((actionName) => [
    `${normalizedPage}_${actionName}`,
    `${actionName}_${normalizedPage}`,
  ]);

  return hasAnyPermission(user, permissionNames);
};
