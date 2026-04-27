type SubareaOption = {
  value: number;
  label: string;
};

export const extractSubareas = (subarea: any): SubareaOption[] => {
  return subarea?.employeeSubareas?.map((rp: any) => ({
    value: rp?.subarea?.subareaid,
    label: rp?.subarea?.name,
  }))?.filter((p: any) => p.value && p.label) || [];
};