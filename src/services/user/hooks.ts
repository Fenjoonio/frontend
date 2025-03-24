import { USER_QUERY_KEYS } from "./constants";
import type { GetUserByIdParams, User } from "./types";
import { getCurrentUser, getUserById, updateCurrentUser } from "./functions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetCurrentUser() {
  return useQuery({
    queryKey: [USER_QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
}

export function useUpdateCurrentUser(options?: {
  onSuccess?: (res: User) => void;
  onError?: (err: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationKey: [USER_QUERY_KEYS.UPDATE_CURRENT_USER],
    mutationFn: updateCurrentUser,
    onSuccess: (response) => {
      options?.onSuccess?.(response);
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.GET_CURRENT_USER] });
    },
  });
}

export function useGetUserById(params: GetUserByIdParams) {
  return useQuery({
    queryKey: [USER_QUERY_KEYS.GET_CURRENT_USER, params],
    queryFn: () => getUserById(params),
  });
}
