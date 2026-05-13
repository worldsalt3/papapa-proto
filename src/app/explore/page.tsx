"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WagerCard from "@/components/WagerCard";
import { WagerCardSkeleton } from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import { Search, Compass, X } from "lucide-react";

interface Wager {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: string;
  status: string;
  creatorUsername: string;
  participantCount: number;
  createdAt: string;
  expiresAt?: string;
}

const categories = [
  { v: "", label: "All" },
  { v: "football", label: "Football" },
  { v: "basketball", label: "Basketball" },
  { v: "politics", label: "Politics" },
  { v: "entertainment", label: "Entertainment" },
  { v: "esports", label: "Esports" },
  { v: "crypto", label: "Crypto" },
  { v: "other", label: "Other" },
];

const types = [
  { v: "", label: "All types" },
  { v: "DIRECT_CHALLENGE", label: "Challenges" },
  { v: "GROUP_POOL", label: "Pools" },
  { v: "COMMUNITY_MARKET", label: "Markets" },
  { v: "PREDICTION_CONTEST", label: "Contests" },
];

export default function ExplorePage() {
  const [wagers, setWagers] = useState<Wager[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    if (category) params.set("category", category);
    if (type) params.set("type", type);

    fetch(`/api/wagers?${params}`)
      .then((r) => r.json())
      .then((d) => setWagers(d.wagers || []))
      .finally(() => setLoading(false));
  }, [debouncedQuery, category, type]);

  const hasFilters = useMemo(
    () => Boolean(debouncedQuery || category || type),
    [debouncedQuery, category, type],
  );

  return (
    <>
      <Navbar />
      <main className="container-page py-8 pb-24 md:pb-8">
        <h1 className="text-xl font-semibold mb-1">Explore wagers</h1>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Browse open challenges, pools, markets, and contests.
        </p>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search wagers..."
            className="input pl-9"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input !w-auto shrink-0"
          >
            {types.map((t) => (
              <option key={t.v} value={t.v}>
                {t.label}
              </option>
            ))}
          </select>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map((c) => (
              <button
                key={c.v}
                onClick={() => setCategory(c.v)}
                className={`shrink-0 text-xs px-2.5 py-1.5 rounded-md transition-colors ${
                  category === c.v
                    ? "text-[var(--accent)] bg-[var(--accent-soft)] font-medium"
                    : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          {hasFilters && (
            <button
              onClick={() => {
                setQuery("");
                setCategory("");
                setType("");
              }}
              className="shrink-0 text-xs text-[var(--text-muted)] hover:text-[var(--text)] inline-flex items-center gap-1 ml-auto"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>

        <div className="text-xs text-[var(--text-dim)] mb-4">
          {loading
            ? "Loading..."
            : `${wagers.length} wager${wagers.length === 1 ? "" : "s"}`}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <WagerCardSkeleton key={i} />
            ))}
          </div>
        ) : wagers.length === 0 ? (
          <EmptyState
            icon={Compass}
            title="No wagers found"
            description={
              hasFilters
                ? "Try different filters or search terms."
                : "Be the first to create a wager."
            }
            action={{ label: "Create wager", href: "/dashboard/create-wager" }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {wagers.map((w) => (
              <WagerCard key={w.id} {...w} />
            ))}
          </div>
        )}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
