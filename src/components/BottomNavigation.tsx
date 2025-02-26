import Link from "next/link";
import { cn } from "@/lib/utils/classnames";
import { HomeIcon, UserIcon } from "lucide-react";

const ITEMS = [
  {
    id: 0,
    href: "/",
    title: "خانه",
    Icon: HomeIcon,
  },
  {
    id: 3,
    href: "/profile/edit",
    title: "پروفایل",
    Icon: UserIcon,
  },
];

type BottomNavigationProps = {
  pathname: string;
  className?: string;
};

export default function BottomNavigation({ pathname, className }: BottomNavigationProps) {
  const isActive = (href: string) => pathname === href;

  return (
    <nav className={cn("bg-[#2e2e2e] border-t border-[#505050] pt-2 pb-2 px-4", className)}>
      <ul className="flex justify-around">
        {ITEMS.map((item) => (
          <li key={item.id}>
            <Link href={item.href} className="w-12 h-10 flex flex-col justify-center items-center">
              <item.Icon
                className={cn(
                  "shrink-0",
                  isActive(item.href) ? "text-[#e0e0e0]" : "text-[#B0B0B0]"
                )}
              />
              {/* <span className="text-xs mt-2">{item.title}</span> */}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
