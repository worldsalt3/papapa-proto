"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import MarketCard from "@/components/MarketCard";
import { BarChart3 } from "lucide-react";

interface Market {
  id: string;
  title: string;
  category: string;
  status: string;
  totalYesAmount: number;
  totalNoAmount: number;
  volume: number;
  yesPercentage: number;
  positionCount: number;
  expiresAt: string;
}

const CATEGORIES = [
  "All",
  "Sports",
  "Entertainment",
  "Politics",
  "Crypto",
  "Tech",
  "Culture",
];

const SORT_OPTIONS = [
  { key: "newest", label: "Newest" },
  { key: "volume", label: "Volume" },
  { key: "closing", label: "Closing Soon" },
];

export default function MarketsPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ sort });
    if (category !== "All") params.set("category", category);
    fetch(`/api/markets?${params}`)
      .then((res) => (res.ok ? res.json() : { markets: [] }))
      .then((data) => setMarkets(data.markets || []))
      .finally(() => setLoading(false));
  }, [category, sort]);

  return (
    <>
      <Navbar />
      <main className="container-page py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-headline">Markets</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Browse prediction markets and take a position
          </p>
        </div>

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Category filter */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  category === cat
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="sm:ml-auto flex gap-1 bg-[var(--surface-2)] p-1 rounded-lg w-fit">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSort(opt.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  sort === opt.key
                    ? "bg-white text-[var(--text)] shadow-[var(--shadow-xs)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card p-5 space-y-3">
                <div className="shimmer h-3 w-16 rounded" />
                <div className="shimmer h-5 w-4/5 rounded" />
                <div className="shimmer h-2 w-full rounded-full" />
                <div className="flex justify-between">
                  <div className="shimmer h-3 w-20 rounded" />
                  <div className="shimmer h-3 w-16 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : markets.length === 0 ? (
          <div className="card py-16 flex flex-col items-center text-center">
            <BarChart3 size={40} className="text-[var(--text-dim)] mb-3" />
            <div className="text-sm font-medium mb-1">No markets found</div>
            <div className="text-xs text-[var(--text-muted)]">
              {category !== "All"
                ? `No markets in the ${category} category yet.`
                : "Markets will appear here once created."}
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m) => (
              <MarketCard
                key={m.id}
                id={m.id}
                title={m.title}
                category={m.category}
                totalYesAmount={m.totalYesAmount}
                totalNoAmount={m.totalNoAmount}
                positionCount={m.positionCount}
                expiresAt={m.expiresAt}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
