"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import EmptyState from "@/components/EmptyState";
import { Trophy } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  firstName?: string;
  lastName?: string;
  reputationScore: number;
  wagersWon: number;
  totalWagers: number;
  winRate: number;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"all" | "month" | "week">("all");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?period=${period}`)
      .then((r) => (r.ok ? r.json() : { entries: [] }))
      .then((d) => setEntries(d.entries || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [period]);

  return (
    <>
      <Navbar />
      <main className="container-page py-8 pb-24 md:pb-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold">Leaderboard</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            Top performers ranked by reputation and win rate.
          </p>
        </div>

        {/* Period tabs */}
        <div className="inline-flex gap-1 p-1 bg-[var(--surface)] border border-[var(--border)] rounded-md mb-4">
          {(["all", "month", "week"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`text-xs px-3 py-1.5 rounded transition-colors ${
                period === p
                  ? "bg-[var(--surface-2)] text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {p === "all"
                ? "All time"
                : p === "month"
                  ? "This month"
                  : "This week"}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="card p-0 overflow-hidden">
            <ul className="divide-y divide-[var(--border)]">
              {[...Array(8)].map((_, i) => (
                <li key={i} className="flex items-center gap-3 p-3">
                  <div className="shimmer w-6 h-4 rounded" />
                  <div className="shimmer w-9 h-9 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="shimmer h-3 w-1/3 rounded" />
                    <div className="shimmer h-3 w-1/5 rounded" />
                  </div>
                  <div className="shimmer h-4 w-12 rounded" />
                </li>
              ))}
            </ul>
          </div>
        ) : entries.length === 0 ? (
          <EmptyState
            icon={Trophy}
            title="No rankings yet"
            description="Rankings will appear once enough wagers have been settled."
          />
        ) : (
          <div className="card p-0 overflow-hidden">
            <ul className="divide-y divide-[var(--border)]">
              {entries.map((e) => {
                const name =
                  [e.firstName, e.lastName].filter(Boolean).join(" ") ||
                  e.username;
                return (
                  <li
                    key={e.userId}
                    className="flex items-center gap-3 p-3 hover:bg-[var(--surface-2)] transition-colors"
                  >
                    <div className="w-6 text-center text-sm font-semibold tabular-nums text-[var(--text-muted)]">
                      {e.rank}
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[var(--surface-3)] flex items-center justify-center text-xs font-semibold text-[var(--text-muted)] shrink-0">
                      {(e.username[0] || "?").toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{name}</div>
                      <div className="text-xs text-[var(--text-muted)]">
                        @{e.username} · {e.wagersWon}/{e.totalWagers} won
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold tabular-nums">
                        {e.reputationScore.toFixed(0)}
                      </div>
                      <div className="text-xs text-[var(--text-dim)]">
                        {e.winRate.toFixed(0)}% wr
                      </div>
                    </div>
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
