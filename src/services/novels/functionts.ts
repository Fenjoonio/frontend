import http from "@/lib/utils/http";
import type {
  CreateNewChapterBody,
  CreateNewChapterResponse,
  CreateNewNovelBody,
  CreateNewNovelResponse,
  DeleteNovelParams,
  EditChapterBody,
  EditChapterResponse,
  EditNovelBody,
  GetChapterByIdParams,
  GetChapterByIdResponse,
  GetNovelByIdParams,
  GetNovelByIdResponse,
  GetNovelsParams,
  GetNovelsResponse,
  Novel,
  PublishNovelParams,
  UnPublishNovelParams,
  UploadCoverImageBody,
  UploadCoverImageResponse,
} from "./types";

export async function getNovels(params: GetNovelsParams) {
  const response = await http.get<GetNovelsResponse>("v1/novels", { searchParams: params });

  return response.data;
}

export async function getNovelById(params: GetNovelByIdParams) {
  const response = await http.get<GetNovelByIdResponse>(`v1/novels/${params.id}`, {
    throwHttpErrors: false,
  });

  return response.data;
}

export async function createNewNovel(body: CreateNewNovelBody) {
  const response = await http.post<CreateNewNovelResponse>("v1/novels", body);

  return response.data;
}

export async function publishNovel({ id }: PublishNovelParams) {
  const response = await http.patch<Novel>(`v1/novels/${id}/publish`);

  return response.data;
}

export async function unPublishNovel({ id }: UnPublishNovelParams) {
  const response = await http.patch<Novel>(`v1/novels/${id}/unpublish`);

  return response.data;
}

export async function editNovel({ id, ...body }: EditNovelBody) {
  const response = await http.put<Novel>(`v1/novels/${id}`, body);

  return response.data;
}

export async function deleteNovel(params: DeleteNovelParams) {
  const response = await http.delete<Novel>(`v1/novels/${params.id}`);

  return response.data;
}

export async function getChapterById({ id, chapterId }: GetChapterByIdParams) {
  const response = await http.get<GetChapterByIdResponse>(`v1/novels/${id}/chapters/${chapterId}`);

  return response.data;
}

export async function createNewChapter({ id, ...body }: CreateNewChapterBody) {
  const response = await http.post<CreateNewChapterResponse>(`v1/novels/${id}/chapters`, body);

  return response.data;
}

export async function editChapter({ id, chapterId, ...body }: EditChapterBody) {
  const response = await http.put<EditChapterResponse>(
    `v1/novels/${id}/chapters/${chapterId}`,
    body
  );

  return response.data;
}

export async function uploadCoverImage({ id, ...body }: UploadCoverImageBody) {
  const formData = new FormData();
  formData.append("image", body.image);

  const response = await http.post<UploadCoverImageResponse>(
    `v1/novels/${id}/cover-image`,
    undefined,
    { body: formData }
  );

  return response.data;
}
