"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import StatusBadge from "@/components/StatusBadge";
import EmptyState from "@/components/EmptyState";
import { ArrowLeft, Users, Clock, Calendar, AlertTriangle } from "lucide-react";

interface Participant {
  id: string;
  userId: string;
  username: string;
  side: string;
  createdAt: string;
}

interface Wager {
  id: string;
  title: string;
  description: string;
  category: string;
  amount: number;
  odds?: string;
  type: string;
  status: string;
  visibility: string;
  creatorId: string;
  creatorUsername: string;
  creatorName: string;
  participantCount: number;
  participants: Participant[];
  eventDate?: string;
  expiresAt?: string;
  createdAt: string;
}

function formatNGN(n: number) {
  return `₦${n.toLocaleString()}`;
}

function timeAgo(iso: string) {
  const d = new Date(iso);
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function WagerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [wager, setWager] = useState<Wager | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/wagers/${id}`)
      .then(async (r) => {
        if (r.status === 404) {
          setNotFound(true);
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d?.wager) setWager(d.wager);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleAccept() {
    if (!wager) return;
    const confirmed = window.confirm(
      `Accept this wager for ${formatNGN(wager.amount)}? This will move funds to escrow.`,
    );
    if (!confirmed) return;

    setAccepting(true);
    setError("");
    try {
      const res = await fetch(`/api/wagers/${id}/accept`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to accept wager");
      } else {
        // refresh
        const fresh = await fetch(`/api/wagers/${id}`).then((r) => r.json());
        if (fresh.wager) setWager(fresh.wager);
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setAccepting(false);
    }
  }

  if (notFound) {
    return (
      <>
        <Navbar />
        <main className="container-page py-12 pb-24 md:pb-12">
          <EmptyState
            icon={AlertTriangle}
            title="Wager not found"
            description="This wager may have been removed or never existed."
            action={{ label: "Browse wagers", href: "/explore" }}
          />
        </main>
        <Footer />
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container-page py-8 pb-24 md:pb-8">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] mb-4"
        >
          <ArrowLeft size={14} /> Back
        </Link>

        {loading || !wager ? (
          <div className="space-y-4">
            <div className="shimmer h-8 w-2/3 rounded" />
            <div className="card space-y-3">
              <div className="shimmer h-4 w-full rounded" />
              <div className="shimmer h-4 w-5/6 rounded" />
              <div className="shimmer h-4 w-3/6 rounded" />
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-1">
                  {wager.type.replace(/_/g, " ")} · {wager.category}
                </div>
                <h1 className="text-2xl font-semibold leading-tight">
                  {wager.title}
                </h1>
              </div>
              <StatusBadge status={wager.status} />
            </div>

            {/* Main card */}
            <div className="card mb-4">
              <p className="text-sm text-[var(--text-muted)] whitespace-pre-wrap mb-5">
                {wager.description}
              </p>

              <div className="grid grid-cols-3 gap-px bg-[var(--border)] rounded-lg overflow-hidden">
                <div className="bg-[var(--surface-2)] p-4">
                  <div className="text-xs text-[var(--text-dim)] mb-1">
                    Stake
                  </div>
                  <div className="text-lg font-bold tabular-nums">
                    {formatNGN(wager.amount)}
                  </div>
                </div>
                <div className="bg-[var(--surface-2)] p-4">
                  <div className="text-xs text-[var(--text-dim)] mb-1">
                    Odds
                  </div>
                  <div className="text-lg font-bold tabular-nums">
                    {wager.odds || "1:1"}
                  </div>
                </div>
                <div className="bg-[var(--surface-2)] p-4">
                  <div className="text-xs text-[var(--text-dim)] mb-1">
                    Category
                  </div>
                  <div className="text-lg font-bold capitalize truncate">
                    {wager.category}
                  </div>
                </div>
              </div>

              {(wager.eventDate || wager.expiresAt) && (
                <div className="mt-4 pt-4 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {wager.eventDate && (
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <Calendar size={14} className="text-[var(--text-dim)]" />
                      <span>Event: {formatDate(wager.eventDate)}</span>
                    </div>
                  )}
                  {wager.expiresAt && (
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <Clock size={14} className="text-[var(--text-dim)]" />
                      <span>Closes: {formatDate(wager.expiresAt)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Creator */}
            <div className="card mb-4">
              <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-3">
                Created by
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--surface-3)] flex items-center justify-center text-xs font-semibold text-[var(--text-muted)]">
                  {(wager.creatorUsername[0] || "?").toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">
                    {wager.creatorName}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    @{wager.creatorUsername} · {timeAgo(wager.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="card mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs uppercase tracking-wider text-[var(--text-dim)]">
                  Participants
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <Users size={12} />
                  {wager.participantCount}
                </div>
              </div>

              {wager.participants.length === 0 ? (
                <div className="text-sm text-[var(--text-dim)] py-2">
                  No participants yet. Be the first.
                </div>
              ) : (
                <div className="divide-y divide-[var(--border)] -mx-4">
                  {wager.participants.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between px-4 py-2.5"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[var(--surface-3)] flex items-center justify-center text-[10px] font-semibold text-[var(--text-muted)]">
                          {(p.username[0] || "?").toUpperCase()}
                        </div>
                        <div className="text-sm truncate">@{p.username}</div>
                      </div>
                      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                        {p.side}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            {error && (
              <div className="card border-[var(--danger)] mb-4">
                <div className="text-sm text-[var(--danger)]">{error}</div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              {wager.status === "PENDING" || wager.status === "ACTIVE" ? (
                <button
                  onClick={handleAccept}
                  disabled={accepting}
                  className="btn-primary flex-1"
                >
                  {accepting
                    ? "Processing..."
                    : `Accept · ${formatNGN(wager.amount)}`}
                </button>
              ) : (
                <button disabled className="btn-secondary flex-1">
                  Wager closed
                </button>
              )}
              <button
                onClick={() => router.push("/explore")}
                className="btn-ghost"
              >
                Browse more
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
