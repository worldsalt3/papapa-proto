"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const cols = [
  {
    title: "Product",
    links: [
      { href: "/explore", label: "Explore" },
      { href: "/challenges", label: "Challenges" },
      { href: "/contests", label: "Contests" },
      { href: "/markets", label: "Markets" },
      { href: "/leaderboard", label: "Leaderboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/responsible-gaming", label: "Responsible gaming" },
      { href: "/kyc-policy", label: "KYC policy" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("done");
        setEmail("");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <Logo size={24} />
              <span className="text-[15px] font-semibold tracking-tight">
                Papapa
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] max-w-xs leading-relaxed">
              Peer-to-peer social betting. Bet with friends, not the house.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex gap-2 max-w-sm pt-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input"
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary btn-sm"
              >
                {status === "done"
                  ? "Subscribed"
                  : status === "loading"
                    ? "..."
                    : "Subscribe"}
              </button>
            </form>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-3 font-medium">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider mb-6" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[var(--text-dim)]">
          <p>© {new Date().getFullYear()} Papapa. 18+ only. Bet responsibly.</p>
          <p>Built in Nigeria.</p>
        </div>
      </div>
    </footer>
  );
}
