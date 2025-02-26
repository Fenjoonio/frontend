import { USER_QUERY_KEYS } from "./constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, updateCurrentUser } from "./functions";
import { User } from "./types";

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
