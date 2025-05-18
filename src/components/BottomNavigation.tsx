import Link from "next/link";
import { cn } from "@/lib/utils/classnames";
import { ChartNoAxesGanttIcon, HomeIcon, UserIcon } from "lucide-react";

const ITEMS = [
  {
    id: 0,
    href: "/",
    title: "خانه",
    Icon: HomeIcon,
    showBadge: false,
  },
  {
    id: 1,
    href: "/thread",
    title: "بافته",
    Icon: ChartNoAxesGanttIcon,
    showBadge: false,
  },
  {
    id: 2,
    href: "/profile",
    title: "پروفایل",
    Icon: UserIcon,
    showBadge: false,
  },
];

type BottomNavigationProps = {
  pathname: string;
  className?: string;
};

export default function BottomNavigation({ pathname, className }: BottomNavigationProps) {
  const isActive = (href: string) => pathname === href;

  return (
    <nav
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)" }}
      className={cn("bg-background border-t border-border pt-2 px-4", className)}
    >
      <ul className="flex justify-around">
        {ITEMS.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="w-12 h-10 flex flex-col justify-center items-center relative"
            >
              {item.showBadge && (
                <span className="size-1 absolute top-1 right-2 bg-danger rounded-sm duration-1000 animate-pulse"></span>
              )}

              <item.Icon
                className={cn("shrink-0", isActive(item.href) ? "" : "text-soft-foreground")}
              />
              {/* <span className="text-xs mt-2">{item.title}</span> */}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
