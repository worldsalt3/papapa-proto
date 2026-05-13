"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Bell, LogOut } from "lucide-react";
import { formatNaira } from "@/lib/utils";
import Logo from "./Logo";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/challenges", label: "Challenges" },
  { href: "/contests", label: "Contests" },
  { href: "/markets", label: "Markets" },
  { href: "/leaderboard", label: "Leaderboard" },
];

interface UserInfo {
  username: string;
  firstName: string;
  lastName: string;
  balance: number;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/user/dashboard")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[var(--border)]">
      <div className="container-page">
        <div className="flex h-14 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo size={26} />
            <span className="text-[15px] font-semibold tracking-tight text-[var(--text)]">
              Papapa
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 mr-auto">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    active
                      ? "text-[var(--text)] bg-[var(--surface-2)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm tabular-nums px-3 py-1.5 rounded-md font-medium text-[var(--gold)] hover:bg-[var(--surface-2)]"
                >
                  {formatNaira(user.balance)}
                </Link>
                <Link
                  href="/dashboard/notifications"
                  className="p-2 rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
                  aria-label="Notifications"
                >
                  <Bell size={16} />
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[var(--surface-2)]"
                >
                  <span className="h-6 w-6 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-[11px] font-semibold">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </span>
                  <span className="text-sm text-[var(--text-muted)]">
                    @{user.username}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-md text-[var(--text-dim)] hover:text-[var(--danger)] hover:bg-[var(--surface-2)]"
                  aria-label="Log out"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-ghost btn-sm">
                  Log in
                </Link>
                <Link href="/register" className="btn-primary btn-sm">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-white">
          <div className="container-page py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-[var(--border)] mt-2 pt-2 flex flex-col gap-1">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="px-3 py-2 rounded-md text-sm hover:bg-[var(--surface-2)]"
                  >
                    Dashboard · {formatNaira(user.balance)}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left px-3 py-2 rounded-md text-sm text-[var(--danger)] hover:bg-[var(--surface-2)]"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-3 py-2 rounded-md text-sm hover:bg-[var(--surface-2)]"
                  >
                    Log in
                  </Link>
                  <Link href="/register" className="btn-primary btn-sm mt-1">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
