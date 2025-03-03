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
        "w-7 h-7 shrink-0 flex items-center justify-center rounded-lg bg-[#9C6B4A]",
        className
      )}
    >
      <div className="w-4 h-4 flex justify-center items-center overflow-hidden text-sm font-bold">
        {userName[0]}
      </div>
    </div>
  );
}
