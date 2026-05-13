"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { formatNaira } from "@/lib/utils";

const wagerTypes = [
  {
    value: "DIRECT_CHALLENGE",
    label: "Direct challenge",
    description: "Challenge a specific user to a 1v1 wager.",
  },
  {
    value: "GROUP_POOL",
    label: "Group pool",
    description: "Create a group-vs-group pool wager.",
  },
  {
    value: "COMMUNITY_MARKET",
    label: "Community market",
    description: "A public Yes/No prediction market.",
  },
  {
    value: "PREDICTION_CONTEST",
    label: "Prediction contest",
    description: "Multi-event prediction accuracy contest.",
  },
];

const categories = [
  "football",
  "basketball",
  "politics",
  "entertainment",
  "esports",
  "crypto",
  "other",
];

const quickAmounts = [500, 1000, 2000, 5000, 10000, 25000];

export default function CreateWagerPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    type: "",
    title: "",
    description: "",
    category: "football",
    amount: 1000,
    odds: 2,
    opponentUsername: "",
    eventDate: "",
    expiresAt: "",
    visibility: "PUBLIC",
  });

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/wagers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create wager");
      router.push(`/wager/${data.wager.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const commission = form.amount * 0.1;
  const payout = form.amount * form.odds - commission;

  return (
    <>
      <Navbar />
      <main className="container-page py-8 max-w-2xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] mb-6"
        >
          <ArrowLeft size={14} /> Back to dashboard
        </Link>

        <h1 className="text-xl font-semibold mb-1">Create a wager</h1>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Step {step} of 3
        </p>

        {/* Progress */}
        <div className="flex gap-1 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-0.5 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-[var(--accent)]" : "bg-[var(--border)]"
              }`}
            />
          ))}
        </div>

        {error && (
          <div className="flex items-start gap-2 px-3 py-2 mb-4 rounded-md bg-[var(--danger-soft)] text-[var(--danger)] text-sm">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="card p-6">
          {/* Step 1: Type */}
          {step === 1 && (
            <div className="space-y-3">
              <h2 className="font-medium mb-3">Choose a wager type</h2>
              {wagerTypes.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setForm({ ...form, type: t.value })}
                  className={`w-full text-left p-4 rounded-md border transition-colors ${
                    form.type === t.value
                      ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                      : "border-[var(--border)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <div className="font-medium text-sm mb-0.5">{t.label}</div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {t.description}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-medium mb-1">Wager details</h2>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="input"
                  placeholder="e.g. Arsenal beats Chelsea on Saturday"
                  maxLength={120}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="input"
                  rows={3}
                  placeholder="Terms, conditions, settlement criteria..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="input"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Odds (multiplier)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1.1"
                    value={form.odds}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        odds: parseFloat(e.target.value) || 1,
                      })
                    }
                    className="input tabular-nums"
                  />
                </div>
              </div>

              {form.type === "DIRECT_CHALLENGE" && (
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Opponent username{" "}
                    <span className="text-[var(--text-dim)]">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.opponentUsername}
                    onChange={(e) =>
                      setForm({ ...form, opponentUsername: e.target.value })
                    }
                    className="input"
                    placeholder="Leave empty for any opponent"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Event date
                  </label>
                  <input
                    type="datetime-local"
                    value={form.eventDate}
                    onChange={(e) =>
                      setForm({ ...form, eventDate: e.target.value })
                    }
                    className="input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Expires at
                  </label>
                  <input
                    type="datetime-local"
                    value={form.expiresAt}
                    onChange={(e) =>
                      setForm({ ...form, expiresAt: e.target.value })
                    }
                    className="input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Amount */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-medium mb-1">Stake & visibility</h2>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Stake amount
                </label>
                <input
                  type="number"
                  min="100"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({ ...form, amount: parseInt(e.target.value) || 0 })
                  }
                  className="input tabular-nums"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickAmounts.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setForm({ ...form, amount: a })}
                      className={`text-xs px-2.5 py-1 rounded-md border ${
                        form.amount === a
                          ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                          : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)]"
                      }`}
                    >
                      {formatNaira(a)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Visibility
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "PUBLIC", label: "Public" },
                    { value: "PRIVATE", label: "Private" },
                    { value: "INVITE_ONLY", label: "Invite only" },
                  ].map((v) => (
                    <button
                      key={v.value}
                      type="button"
                      onClick={() => setForm({ ...form, visibility: v.value })}
                      className={`p-2.5 rounded-md border text-sm ${
                        form.visibility === v.value
                          ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                          : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)]"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="rounded-lg bg-[var(--bg)] border border-[var(--border)] p-4 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Your stake</span>
                  <span className="tabular-nums">
                    {formatNaira(form.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">
                    Potential win
                  </span>
                  <span className="tabular-nums">{formatNaira(payout)}</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--text-dim)]">
                  <span>Commission (10% on profit)</span>
                  <span className="tabular-nums">
                    {formatNaira(commission)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={() => (step > 1 ? setStep(step - 1) : router.back())}
            className="btn-secondary btn-sm"
          >
            <ArrowLeft size={14} /> Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && !form.type) ||
                (step === 2 && (!form.title || !form.description))
              }
              className="btn-primary btn-sm"
            >
              Continue <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || form.amount < 100}
              className="btn-primary btn-sm"
            >
              {loading ? "Creating..." : "Create wager"}
            </button>
          )}
        </div>
      </main>
    </>
  );
}
