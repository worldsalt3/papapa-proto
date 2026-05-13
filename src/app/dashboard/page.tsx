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
import {
  Plus,
  ArrowDownRight,
  ArrowUpRight,
  Zap,
  Compass,
  TrendingUp,
  TrendingDown,
  Shield,
  Target,
} from "lucide-react";
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
  const totalPortfolio = user.balance + user.escrowBalance;
  const pnl = user.wagersWon * 500 - user.wagersLost * 500; // approximate P&L
  const pnlPositive = pnl >= 0;

  return (
    <>
      <Navbar />
      <main className="container-page py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs text-[var(--text-dim)] uppercase tracking-wider mb-1">
              Portfolio
            </p>
            <h1 className="text-2xl font-bold tabular-nums">
              {formatNaira(totalPortfolio)}
            </h1>
            <div className="flex items-center gap-1.5 mt-1">
              {pnlPositive ? (
                <TrendingUp size={14} className="text-[var(--gain)]" />
              ) : (
                <TrendingDown size={14} className="text-[var(--loss)]" />
              )}
              <span
                className={`text-sm font-medium ${pnlPositive ? "text-[var(--gain)]" : "text-[var(--loss)]"}`}
              >
                {pnlPositive ? "+" : ""}
                {formatNaira(Math.abs(pnl))}
              </span>
              <span className="text-xs text-[var(--text-dim)]">all time</span>
            </div>
          </div>
          <Link href="/dashboard/create-wager" className="btn-primary btn-sm">
            <Plus size={14} /> New Position
          </Link>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="stat-trading stat-trading-gain">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] text-[var(--text-dim)] uppercase tracking-widest font-medium">
                Available
              </span>
              <div className="h-8 w-8 rounded-xl bg-[var(--gain)] flex items-center justify-center">
                <ArrowDownRight size={15} className="text-white" />
              </div>
            </div>
            <div className="text-xl font-bold tabular-nums tracking-tight">
              {formatNaira(user.balance)}
            </div>
          </div>
          <div className="stat-trading stat-trading-warn">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] text-[var(--text-dim)] uppercase tracking-widest font-medium">
                In Escrow
              </span>
              <div className="h-8 w-8 rounded-xl bg-[#d97706] flex items-center justify-center">
                <Shield size={15} className="text-white" />
              </div>
            </div>
            <div className="text-xl font-bold tabular-nums tracking-tight">
              {formatNaira(user.escrowBalance)}
            </div>
          </div>
          <div className="stat-trading stat-trading-accent">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] text-[var(--text-dim)] uppercase tracking-widest font-medium">
                Win Rate
              </span>
              <div className="h-8 w-8 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                <Target size={15} className="text-white" />
              </div>
            </div>
            <div className="text-xl font-bold tabular-nums tracking-tight">
              {winRate}%
              <span className="text-[11px] text-[var(--text-dim)] font-normal ml-1.5">
                {user.wagersWon}W / {user.wagersLost}L
              </span>
            </div>
          </div>
          <div className="stat-trading stat-trading-neutral">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] text-[var(--text-dim)] uppercase tracking-widest font-medium">
                Reputation
              </span>
              <div className="h-8 w-8 rounded-xl bg-[#64748b] flex items-center justify-center">
                <Zap size={15} className="text-white" />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold tabular-nums tracking-tight">
                {user.reputationScore}
              </span>
              <div className="flex-1 mb-1.5">
                <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#64748b] transition-all"
                    style={{ width: `${user.reputationScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <Link href="/dashboard/deposit" className="action-pill">
            <div className="action-pill-icon bg-[var(--gain-soft)]">
              <ArrowDownRight size={18} className="text-[var(--gain)]" />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">Deposit</div>
              <div className="text-[11px] text-[var(--text-dim)] leading-tight">
                Fund wallet
              </div>
            </div>
          </Link>
          <Link href="/dashboard/withdraw" className="action-pill">
            <div className="action-pill-icon bg-[var(--loss-soft)]">
              <ArrowUpRight size={18} className="text-[var(--loss)]" />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">
                Withdraw
              </div>
              <div className="text-[11px] text-[var(--text-dim)] leading-tight">
                To bank
              </div>
            </div>
          </Link>
          <Link href="/dashboard/create-wager" className="action-pill">
            <div className="action-pill-icon bg-[var(--accent-soft)]">
              <Zap size={18} className="text-[var(--accent)]" />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">
                New Position
              </div>
              <div className="text-[11px] text-[var(--text-dim)] leading-tight">
                Create wager
              </div>
            </div>
          </Link>
          <Link href="/markets" className="action-pill">
            <div className="action-pill-icon bg-[var(--surface-2)]">
              <Compass size={18} className="text-[var(--text-muted)]" />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">Markets</div>
              <div className="text-[11px] text-[var(--text-dim)] leading-tight">
                Trade predictions
              </div>
            </div>
          </Link>
        </div>

        {/* Trade log */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
            <h2 className="font-medium text-sm">Trade Log</h2>
            <Link
              href="/explore"
              className="text-xs text-[var(--accent)] hover:underline"
            >
              View all
            </Link>
          </div>
          {recentWagers.length === 0 ? (
            <div className="p-4">
              <EmptyState
                icon={Zap}
                title="No positions yet"
                description="Open your first position by creating or joining a wager."
                action={{
                  label: "Create position",
                  href: "/dashboard/create-wager",
                }}
              />
            </div>
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {recentWagers.map((w) => {
                const isWin = w.status === "SETTLED" || w.status === "WON";
                const isLoss = w.status === "LOST";
                return (
                  <li key={w.id}>
                    <Link
                      href={`/wager/${w.id}`}
                      className="flex items-center justify-between px-5 py-3 hover:bg-[var(--surface-2)] transition-colors"
                    >
                      <div className="min-w-0 flex-1 pr-4">
                        <div className="text-sm font-medium truncate">
                          {w.title}
                        </div>
                        <div className="text-[11px] text-[var(--text-dim)] mt-0.5">
                          {timeAgo(w.createdAt)} · {w.type.replace(/_/g, " ")}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-sm font-semibold tabular-nums ${
                            isWin
                              ? "text-[var(--gain)]"
                              : isLoss
                                ? "text-[var(--loss)]"
                                : ""
                          }`}
                        >
                          {isWin ? "+" : isLoss ? "-" : ""}
                          {formatNaira(w.amount)}
                        </span>
                        <StatusBadge status={w.status} />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
