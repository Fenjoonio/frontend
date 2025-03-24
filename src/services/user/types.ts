export type User = {
  id: number;
  phone: string;
  firstName: string;
  lastName: string;
  nickname: string;
  bio: string;
  isVerified: boolean;
};

export type GetUserByIdParams = {
  id: number;
};
