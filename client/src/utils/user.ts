
type RoleOption = {
  value: number;
  label: string;
};

export const extractRoles = (user: any): RoleOption[] => {
  return user?.userRoles?.map((ur: any) => ({
    value: ur?.role?.roleid,
    label: ur?.role?.name,
  }))?.filter((p: any) => p.value && p.label) || [];
};