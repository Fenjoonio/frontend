import { NOVELS_QUERY_KEYS } from "./constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewChapter,
  createNewNovel,
  deleteNovel,
  editChapter,
  editNovel,
  getChapterById,
  getNovelById,
  publishNovel,
  unPublishNovel,
  uploadCoverImage,
} from "./functionts";
import type {
  Novel,
  GetNovelByIdParams,
  PublishNovelParams,
  CreateNewNovelResponse,
  EditNovelBody,
  UnPublishNovelParams,
  CreateNewChapterResponse,
  UploadCoverImageBody,
  EditChapterBody,
  EditChapterResponse,
  GetChapterByIdParams,
} from "./types";

export function useGetNovelById(params: GetNovelByIdParams) {
  return useQuery({
    queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, params],
    queryFn: () => getNovelById(params),
  });
}

export function useCreateNewNovel(options?: { onSuccess?: (res: CreateNewNovelResponse) => void }) {
  return useMutation({ ...options, mutationFn: createNewNovel });
}

export function useEditNovel(
  params: Pick<EditNovelBody, "id">,
  options?: { onSuccess?: (res: Novel) => void }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editNovel,
    onSuccess: (response) => {
      options?.onSuccess?.(response);

      // TODO: Invalid get-all-novels cache too
      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, params] });
    },
  });
}

export function usePublishNovel(
  params: PublishNovelParams,
  options?: { onSuccess?: (res: Novel) => void }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => publishNovel(params),
    onSuccess: (response) => {
      options?.onSuccess?.(response);

      // TODO: Invalid get-all-novels cache too
      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, params] });
    },
  });
}

export function useUnPublishNovel(
  params: UnPublishNovelParams,
  options?: { onSuccess?: (res: Novel) => void }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => unPublishNovel(params),
    onSuccess: (response) => {
      options?.onSuccess?.(response);

      // TODO: Invalid get-all-novels cache too
      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, params] });
    },
  });
}

export function useDeleteNovel(options?: { onSuccess?: (res: Novel) => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNovel,
    onSuccess: (response) => {
      options?.onSuccess?.(response);

      // TODO: Invalid get-all-novels cache too
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });
}

export function useGetChapterById(params: GetChapterByIdParams) {
  return useQuery({
    queryKey: [NOVELS_QUERY_KEYS.GET_CHAPTER_BY_ID, params],
    queryFn: () => getChapterById(params),
  });
}

export function useCreateNewChapter(options?: {
  onSuccess?: (res: CreateNewChapterResponse) => void;
}) {
  return useMutation({ ...options, mutationFn: createNewChapter });
}

export function useEditChapter(
  params: Pick<EditChapterBody, "id" | "chapterId">,
  options?: { onSuccess?: (res: EditChapterResponse) => void }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editChapter,
    onSuccess: (response) => {
      options?.onSuccess?.(response);

      // TODO: Invalid get-all-novels cache too
      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, params] });
    },
  });
}

export function useUploadCoverImage(params: Pick<UploadCoverImageBody, "id">) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadCoverImage,
    onSuccess: (res) => {
      queryClient.setQueriesData(
        { queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, params] },
        (oldData: Novel | undefined) => {
          if (!oldData) return oldData;

          return { ...oldData, coverImage: res.url };
        }
      );
    },
  });
}
