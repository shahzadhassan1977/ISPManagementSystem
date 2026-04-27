type PermissionOption = {
  value: number;
  label: string;
};

export const extractPermissions = (role: any): PermissionOption[] => {
  return role?.rolePermissions?.map((rp: any) => ({
    value: rp?.permission?.permissionid,
    label: rp?.permission?.name,
  }))?.filter((p: any) => p.value && p.label) || [];
};