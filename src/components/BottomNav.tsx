"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Plus, Trophy, User } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  {
    href: "/dashboard/create-wager",
    label: "Create",
    icon: Plus,
    primary: true,
  },
  { href: "/leaderboard", label: "Ranks", icon: Trophy },
  { href: "/dashboard", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="grid grid-cols-5 h-14">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          if (item.primary) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-center"
                aria-label={item.label}
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                  <Icon size={18} />
                </span>
              </Link>
            );
          }
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 text-[10px] ${
                active ? "text-[var(--text)]" : "text-[var(--text-dim)]"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
