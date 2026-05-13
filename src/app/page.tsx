import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  Trophy,
  Lock,
  Scale,
  Star,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section>
          <div className="container-page py-24 sm:py-32 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-sm font-medium mb-6">
              <CheckCircle2 size={14} />
              Escrow-protected wagers
            </div>
            <h1 className="text-display mb-6">
              Bet with friends,{" "}
              <span className="text-[var(--accent)]">not the house.</span>
            </h1>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-lg mx-auto mb-10">
              Peer-to-peer wagers with escrow. You set the terms, pick the
              stakes, and settle transparently.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register"
                className="btn-primary h-11 px-6 text-base"
              >
                Get started
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/how-it-works"
                className="btn-secondary h-11 px-6 text-base"
              >
                How it works
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[var(--bg-subtle)]">
          <div className="container-page py-12">
            <div className="grid grid-cols-3 gap-8">
              {[
                { value: "0%", label: "Platform exposure" },
                { value: "10%", label: "Commission on profit" },
                { value: "100%", label: "Peer-to-peer" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold tabular-nums text-[var(--accent)] mb-1">
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[var(--text-muted)]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section>
          <div className="container-page py-24">
            <div className="text-center mb-14">
              <h2 className="text-headline mb-3">Four ways to play</h2>
              <p className="text-[var(--text-muted)] max-w-md mx-auto">
                Pick the format that matches how you want to bet.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  icon: Zap,
                  title: "Direct challenges",
                  desc: "1v1 wagers. You set the stakes and terms; they accept or pass.",
                },
                {
                  icon: Users,
                  title: "Group pools",
                  desc: "Pool funds with your crew and challenge another group on any outcome.",
                },
                {
                  icon: TrendingUp,
                  title: "Community markets",
                  desc: "Create Yes/No markets on anything measurable. The crowd takes positions.",
                },
                {
                  icon: Trophy,
                  title: "Prediction contests",
                  desc: "Compete on prediction accuracy. Best forecaster wins the pool.",
                },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="rounded-xl bg-white p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-md)] transition-shadow"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center mb-5">
                      <Icon size={20} className="text-[var(--accent)]" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                    <p className="text-[15px] text-[var(--text-muted)] leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="bg-[var(--bg-subtle)]">
          <div className="container-page py-24">
            <div className="text-center mb-14">
              <h2 className="text-headline mb-3">Built on trust</h2>
              <p className="text-[var(--text-muted)] max-w-md mx-auto">
                Every wager is escrow-backed, reputation-scored, and
                dispute-resolved.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Lock,
                  title: "Escrow protection",
                  desc: "Stakes lock before a wager goes live. No one touches the funds until settlement.",
                },
                {
                  icon: Scale,
                  title: "Transparent settlement",
                  desc: "Outcomes are verified against external data. Settlement is automatic.",
                },
                {
                  icon: Star,
                  title: "Reputation system",
                  desc: "Every user builds a public reputation from completed wagers and disputes.",
                },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.title} className="text-center">
                    <div className="h-12 w-12 rounded-full bg-white shadow-[var(--shadow-card)] flex items-center justify-center mx-auto mb-5">
                      <Icon size={22} className="text-[var(--accent)]" />
                    </div>
                    <h3 className="font-semibold mb-2">{t.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs mx-auto">
                      {t.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section>
          <div className="container-page py-24">
            <div className="text-center mb-14">
              <h2 className="text-headline mb-3">How it works</h2>
              <p className="text-[var(--text-muted)] max-w-md mx-auto">
                Four steps from sign-up to payout.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
              {[
                {
                  n: "01",
                  title: "Create or find a wager",
                  desc: "Browse open challenges or post your own.",
                },
                {
                  n: "02",
                  title: "Accept and lock funds",
                  desc: "Both stakes move into escrow. No one can withdraw.",
                },
                {
                  n: "03",
                  title: "Wait for the outcome",
                  desc: "Results are verified through trusted data sources.",
                },
                {
                  n: "04",
                  title: "Automatic settlement",
                  desc: "Winner takes the pot. 10% commission on profit only.",
                },
              ].map((s) => (
                <div key={s.n}>
                  <div className="text-3xl font-bold text-[var(--accent)] mb-4 tabular-nums">
                    {s.n}
                  </div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--accent)]">
          <div className="container-page py-20 text-center">
            <h2 className="text-headline text-white mb-3">
              Ready to place your first wager?
            </h2>
            <p className="text-white/70 mb-8 max-w-sm mx-auto">
              Join thousands of Nigerians betting peer-to-peer. No bookmaker. No
              house edge.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-white text-[var(--accent)] font-medium text-base hover:bg-white/90 transition-colors"
              >
                Create your account
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-transparent text-white border border-white/30 font-medium text-base hover:bg-white/10 transition-colors"
              >
                Browse wagers
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
