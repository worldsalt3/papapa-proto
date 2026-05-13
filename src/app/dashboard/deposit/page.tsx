"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, ArrowDownToLine, Shield } from "lucide-react";

const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

export default function DepositPage() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const value = Number(amount);
    if (!value || value < 100) {
      setError("Minimum deposit is ₦100");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/payments/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: value }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to initialize deposit");
        setLoading(false);
        return;
      }
      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
      }
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
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

        <div className="mb-6">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <ArrowDownToLine size={18} className="text-[var(--accent)]" />
            Deposit
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Add funds to your wallet via Paystack.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">
              Amount (₦)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              min={100}
              required
              className="input text-base"
            />
            <div className="text-xs text-[var(--text-dim)] mt-1.5">
              Minimum ₦100
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-[var(--text-muted)] mb-2">
              Quick amounts
            </div>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(String(q))}
                  className={`text-sm py-2 rounded-md border transition-colors tabular-nums ${
                    Number(amount) === q
                      ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-soft)]"
                      : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  ₦{q.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="text-sm text-[var(--danger)]">{error}</div>}

          <button
            type="submit"
            disabled={loading || !amount}
            className="btn-primary w-full"
          >
            {loading
              ? "Processing..."
              : `Deposit ${amount ? `₦${Number(amount).toLocaleString()}` : ""}`}
          </button>

          <div className="text-xs text-[var(--text-dim)] flex items-start gap-2 pt-2 border-t border-[var(--border)]">
            <Shield size={12} className="mt-0.5 shrink-0" />
            <span>
              Secured by Paystack. Cards, bank transfer, and USSD supported.
            </span>
          </div>
        </form>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
