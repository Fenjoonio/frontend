import type { User } from "@/services/user";

export function getUserName(user: User) {
  if (user.nickname) {
    return user.nickname;
  }

  if (user.lastName && user.firstName) {
    return `${user.firstName} ${user.lastName}`;
  }

  if (user.firstName || user.lastName) {
    return user.firstName || user.lastName;
  }

  return `کاربر ${user.id}#`;
}
