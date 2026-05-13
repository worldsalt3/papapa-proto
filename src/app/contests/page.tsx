"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WagerCard from "@/components/WagerCard";
import { WagerCardSkeleton } from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import { Trophy, Plus } from "lucide-react";

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

export default function ContestsPage() {
  const [wagers, setWagers] = useState<Wager[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wagers?type=PREDICTION_CONTEST")
      .then((r) => r.json())
      .then((d) => setWagers(d.wagers || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="container-page py-8 pb-24 md:pb-8">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl font-semibold">Prediction contests</h1>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">
              Compete on prediction accuracy. Best forecaster wins.
            </p>
          </div>
          <Link href="/dashboard/create-wager" className="btn-primary btn-sm">
            <Plus size={14} /> New contest
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <WagerCardSkeleton key={i} />
            ))}
          </div>
        ) : wagers.length === 0 ? (
          <EmptyState
            icon={Trophy}
            title="No active contests"
            description="Create a prediction contest and challenge the community."
            action={{
              label: "Create contest",
              href: "/dashboard/create-wager",
            }}
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
