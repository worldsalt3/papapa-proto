"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, ArrowUpFromLine, Info } from "lucide-react";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const value = Number(amount);
    if (!value || value < 500) {
      setError("Minimum withdrawal is ₦500");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/payments/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: value,
          bankName,
          accountNumber,
          accountName,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit withdrawal");
      } else {
        setSuccess(
          "Withdrawal request submitted. You'll receive funds within 24 hours.",
        );
        setAmount("");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
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
            <ArrowUpFromLine size={18} className="text-[var(--accent)]" />
            Withdraw
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Transfer funds from your wallet to your bank account.
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
              min={500}
              required
              className="input text-base"
            />
            <div className="text-xs text-[var(--text-dim)] mt-1.5">
              Minimum ₦500
            </div>
          </div>

          <div className="divider" />

          <div className="space-y-3">
            <div className="text-xs font-medium text-[var(--text-muted)]">
              Bank details
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                Bank name
              </label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. GTBank"
                required
                className="input"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                Account number
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(
                    e.target.value.replace(/\D/g, "").slice(0, 10),
                  )
                }
                placeholder="0123456789"
                pattern="\d{10}"
                required
                className="input tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                Account name
              </label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Full name on account"
                required
                className="input"
              />
            </div>
          </div>

          {error && <div className="text-sm text-[var(--danger)]">{error}</div>}
          {success && (
            <div className="text-sm text-[var(--success)]">{success}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Processing..." : "Request withdrawal"}
          </button>

          <div className="text-xs text-[var(--text-dim)] flex items-start gap-2 pt-2 border-t border-[var(--border)]">
            <Info size={12} className="mt-0.5 shrink-0" />
            <span>
              Withdrawals are processed within 24 hours. A small processing fee
              may apply.
            </span>
          </div>
        </form>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
