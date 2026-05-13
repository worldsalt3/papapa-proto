"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Trophy, TrendingUp, Flame, Target } from "lucide-react";

interface LeaderboardUser {
  rank: number;
  id: string;
  username: string;
  name: string;
  initials: string;
  totalWagers: number;
  wagersWon: number;
  wagersLost: number;
  winRate: number;
  reputationScore: number;
}

const SORT_TABS = [
  { key: "reputation", label: "Reputation", icon: Trophy },
  { key: "winRate", label: "Win Rate", icon: Target },
  { key: "totalWagers", label: "Most Active", icon: Flame },
];

const RANK_COLORS = ["", "text-[#d97706]", "text-[#94a3b8]", "text-[#b45309]"];

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [sort, setSort] = useState("reputation");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?sort=${sort}`)
      .then((res) => (res.ok ? res.json() : { leaderboard: [] }))
      .then((data) => setUsers(data.leaderboard || []))
      .finally(() => setLoading(false));
  }, [sort]);

  return (
    <>
      <Navbar />
      <main className="container-page py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-headline">Leaderboard</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Top predictors ranked by performance
          </p>
        </div>

        {/* Sort tabs */}
        <div className="flex gap-1 mb-6 bg-[var(--surface-2)] p-1 rounded-lg w-fit">
          {SORT_TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setSort(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  sort === tab.key
                    ? "bg-white text-[var(--text)] shadow-[var(--shadow-xs)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Top 3 podium (desktop) */}
        {!loading && users.length >= 3 && (
          <div className="hidden md:grid grid-cols-3 gap-4 mb-8">
            {[users[1], users[0], users[2]].map((u, i) => {
              const podiumOrder = [2, 1, 3];
              const heights = ["h-28", "h-36", "h-24"];
              const bgColors = [
                "bg-[var(--surface-2)]",
                "bg-[var(--accent-soft)]",
                "bg-[var(--surface-2)]",
              ];
              return (
                <div key={u.id} className="flex flex-col items-center">
                  <span className="h-10 w-10 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-sm font-semibold mb-2">
                    {u.initials}
                  </span>
                  <div className="text-sm font-semibold">{u.name}</div>
                  <div className="text-[11px] text-[var(--text-dim)] mb-2">
                    @{u.username}
                  </div>
                  <div className="flex items-center gap-3 text-xs mb-3">
                    <span className="text-[var(--gain)] font-medium">
                      {u.winRate}% wins
                    </span>
                    <span className="text-[var(--text-muted)]">
                      Rep {u.reputationScore}
                    </span>
                  </div>
                  <div
                    className={`w-full ${heights[i]} ${bgColors[i]} rounded-t-lg flex items-end justify-center pb-3`}
                  >
                    <span
                      className={`text-2xl font-bold ${RANK_COLORS[podiumOrder[i]]}`}
                    >
                      #{podiumOrder[i]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="hidden sm:grid grid-cols-[48px_1fr_80px_80px_80px_80px] gap-4 px-5 py-3 border-b border-[var(--border)] text-xs text-[var(--text-dim)] font-medium">
            <span>Rank</span>
            <span>Trader</span>
            <span className="text-right">Win Rate</span>
            <span className="text-right">Rep</span>
            <span className="text-right">Won</span>
            <span className="text-right">Total</span>
          </div>
          {loading ? (
            <div className="space-y-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="px-5 py-4 border-b border-[var(--border)]"
                >
                  <div className="h-5 shimmer rounded w-full" />
                </div>
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-[var(--text-muted)]">
              No traders with completed wagers yet.
            </div>
          ) : (
            users.map((u) => (
              <div
                key={u.id}
                className="grid grid-cols-[48px_1fr_80px_80px] sm:grid-cols-[48px_1fr_80px_80px_80px_80px] gap-4 px-5 py-3 items-center border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--surface-2)] transition-colors"
              >
                <span
                  className={`text-sm font-bold tabular-nums ${u.rank <= 3 ? RANK_COLORS[u.rank] : "text-[var(--text-dim)]"}`}
                >
                  #{u.rank}
                </span>
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="h-8 w-8 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-xs font-semibold shrink-0">
                    {u.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{u.name}</div>
                    <div className="text-[11px] text-[var(--text-dim)]">
                      @{u.username}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-right tabular-nums font-medium text-[var(--gain)]">
                  {u.winRate}%
                </span>
                <span className="text-sm text-right tabular-nums">
                  {u.reputationScore}
                </span>
                <span className="text-sm text-right tabular-nums text-[var(--gain)] hidden sm:block">
                  {u.wagersWon}
                </span>
                <span className="text-sm text-right tabular-nums text-[var(--text-muted)] hidden sm:block">
                  {u.totalWagers}
                </span>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
