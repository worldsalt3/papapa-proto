"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import EmptyState from "@/components/EmptyState";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Trophy,
  Users,
  ArrowLeft,
} from "lucide-react";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const iconMap: Record<string, typeof Bell> = {
  WAGER_ACCEPTED: Users,
  WAGER_SETTLED: Trophy,
  WAGER_WON: Trophy,
  WAGER_LOST: AlertTriangle,
  DEPOSIT: DollarSign,
  WITHDRAWAL: DollarSign,
  DISPUTE: AlertTriangle,
};

function timeAgo(date: string) {
  const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => (r.ok ? r.json() : { notifications: [] }))
      .then((d) => setNotifications(d.notifications || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const unread = notifications.filter((n) => !n.isRead).length;

  async function markAllRead() {
    await fetch("/api/notifications/read-all", { method: "POST" }).catch(
      () => {},
    );
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  return (
    <>
      <Navbar />
      <main className="container-narrow py-8 pb-24 md:pb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] mb-4"
        >
          <ArrowLeft size={14} /> Dashboard
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold">Notifications</h1>
            {unread > 0 && (
              <p className="text-xs text-[var(--accent)] mt-0.5">
                {unread} unread
              </p>
            )}
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="btn-ghost btn-sm">
              <CheckCircle size={14} /> Mark all read
            </button>
          )}
        </div>

        {loading ? (
          <div className="card space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="shimmer w-8 h-8 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="shimmer h-3 w-2/3 rounded" />
                  <div className="shimmer h-3 w-1/2 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="No notifications"
            description="You're all caught up. Notifications will appear here."
          />
        ) : (
          <div className="card p-0 overflow-hidden">
            <ul className="divide-y divide-[var(--border)]">
              {notifications.map((n) => {
                const Icon = iconMap[n.type] || Bell;
                return (
                  <li
                    key={n.id}
                    className={`flex gap-3 p-4 ${
                      !n.isRead ? "bg-[var(--accent-soft)]" : ""
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] flex items-center justify-center shrink-0 text-[var(--text-muted)]">
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{n.title}</div>
                      <div className="text-xs text-[var(--text-muted)] mt-0.5">
                        {n.message}
                      </div>
                      <div className="text-xs text-[var(--text-dim)] mt-1">
                        {timeAgo(n.createdAt)}
                      </div>
                    </div>
                    {!n.isRead && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
