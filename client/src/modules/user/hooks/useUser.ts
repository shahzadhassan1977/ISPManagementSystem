import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  createUserRole,
} from "../api/user.api";

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userid, data }: any) => updateUser(userid, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};


export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });  
};

export const useCreateUserRole = () => {
    const qc = useQueryClient();
  
    return useMutation({
      mutationFn: createUserRole,
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["users"] });
      },
    });
};