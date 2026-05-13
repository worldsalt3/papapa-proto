"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import EmptyState from "@/components/EmptyState";
import StatusBadge from "@/components/StatusBadge";
import { DashboardSkeleton } from "@/components/Skeleton";
import { Plus, ArrowDownRight, ArrowUpRight, Zap, Compass } from "lucide-react";
import { formatNaira, timeAgo } from "@/lib/utils";

interface DashboardData {
  user: {
    username: string;
    firstName: string;
    lastName: string;
    balance: number;
    escrowBalance: number;
    reputationScore: number;
    totalWagers: number;
    wagersWon: number;
    wagersLost: number;
  };
  recentWagers: Array<{
    id: string;
    title: string;
    amount: number;
    status: string;
    type: string;
    createdAt: string;
  }>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/dashboard")
      .then((res) => {
        if (res.status === 401) {
          router.push("/login");
          return null;
        }
        return res.ok ? res.json() : null;
      })
      .then((d) => d && setData(d))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container-page py-8">
          <DashboardSkeleton />
        </main>
      </>
    );
  }

  if (!data) return null;

  const { user, recentWagers } = data;
  const winRate =
    user.totalWagers > 0
      ? Math.round((user.wagersWon / user.totalWagers) * 100)
      : 0;

  return (
    <>
      <Navbar />
      <main className="container-page py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold">
              Welcome back, {user.firstName}
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">
              @{user.username}
            </p>
          </div>
          <Link href="/dashboard/create-wager" className="btn-primary btn-sm">
            <Plus size={14} /> New wager
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card p-5">
            <div className="text-xs text-[var(--text-muted)] mb-2">
              Available
            </div>
            <div className="text-xl font-bold tabular-nums">
              {formatNaira(user.balance)}
            </div>
          </div>
          <div className="card p-5">
            <div className="text-xs text-[var(--text-muted)] mb-2">
              In escrow
            </div>
            <div className="text-xl font-bold tabular-nums">
              {formatNaira(user.escrowBalance)}
            </div>
          </div>
          <div className="card p-5">
            <div className="text-xs text-[var(--text-muted)] mb-2">
              Reputation
            </div>
            <div className="text-xl font-bold tabular-nums">
              {user.reputationScore}
            </div>
          </div>
          <div className="card p-5">
            <div className="text-xs text-[var(--text-muted)] mb-2">
              Win rate
            </div>
            <div className="text-xl font-bold tabular-nums">
              {winRate}%{" "}
              <span className="text-xs text-[var(--text-dim)] font-normal">
                · {user.wagersWon}/{user.totalWagers}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Link href="/dashboard/deposit" className="card-interactive p-5">
            <div className="h-9 w-9 rounded-lg bg-[var(--success-soft)] flex items-center justify-center mb-3">
              <ArrowDownRight size={18} className="text-[var(--success)]" />
            </div>
            <div className="text-sm font-semibold">Deposit</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">
              Fund wallet
            </div>
          </Link>
          <Link href="/dashboard/withdraw" className="card-interactive p-5">
            <div className="h-9 w-9 rounded-lg bg-[var(--warning-soft)] flex items-center justify-center mb-3">
              <ArrowUpRight size={18} className="text-[var(--warning)]" />
            </div>
            <div className="text-sm font-semibold">Withdraw</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">
              To bank
            </div>
          </Link>
          <Link href="/dashboard/create-wager" className="card-interactive p-5">
            <div className="h-9 w-9 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center mb-3">
              <Zap size={18} className="text-[var(--accent)]" />
            </div>
            <div className="text-sm font-semibold">Create wager</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">
              New challenge
            </div>
          </Link>
          <Link href="/explore" className="card-interactive p-5">
            <div className="h-9 w-9 rounded-lg bg-[var(--surface-2)] flex items-center justify-center mb-3">
              <Compass size={18} className="text-[var(--text-muted)]" />
            </div>
            <div className="text-sm font-semibold">Explore</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">
              Find wagers
            </div>
          </Link>
        </div>

        {/* Recent wagers */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
            <h2 className="font-medium">Recent activity</h2>
            <Link
              href="/explore"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              View all
            </Link>
          </div>
          {recentWagers.length === 0 ? (
            <div className="p-4">
              <EmptyState
                icon={Zap}
                title="No wagers yet"
                description="Create your first wager and start betting with friends."
                action={{
                  label: "Create wager",
                  href: "/dashboard/create-wager",
                }}
              />
            </div>
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {recentWagers.map((w) => (
                <li key={w.id}>
                  <Link
                    href={`/wager/${w.id}`}
                    className="flex items-center justify-between px-5 py-3 hover:bg-[var(--surface-2)] transition-colors"
                  >
                    <div className="min-w-0 flex-1 pr-4">
                      <div className="text-sm font-medium truncate">
                        {w.title}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] mt-0.5">
                        {timeAgo(w.createdAt)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm tabular-nums">
                        {formatNaira(w.amount)}
                      </span>
                      <StatusBadge status={w.status} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
