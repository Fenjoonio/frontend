import type { User } from "./types";
import { USER_QUERY_KEYS } from "./constants";
import { getCurrentUser, updateCurrentUser } from "./functions";
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
