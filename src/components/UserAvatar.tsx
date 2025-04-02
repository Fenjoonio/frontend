import { User } from "@/services/user";
import { cn } from "@/lib/utils/classnames";
import { getUserName } from "@/lib/utils/users";

type UserAvatarProps = {
  user: User;
  className?: string;
};

export default function UserAvatar({ user, className }: UserAvatarProps) {
  const userName = getUserName(user);

  return (
    <div
      className={cn(
        "size-7 shrink-0 flex items-center justify-center rounded-lg bg-primary",
        className
      )}
    >
      <div className="size-4 flex justify-center items-center overflow-hidden text-sm text-light-gray-100 font-bold">
        {userName[0]}
      </div>
    </div>
  );
}
