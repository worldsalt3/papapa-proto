import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OddsBar from "@/components/OddsBar";
import HeroIllustration from "@/components/illustrations/HeroIllustration";
import EscrowIllustration from "@/components/illustrations/EscrowIllustration";
import P2PIllustration from "@/components/illustrations/P2PIllustration";
import MarketIllustration from "@/components/illustrations/MarketIllustration";
import {
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  Trophy,
  Lock,
  Scale,
  Star,
  Shield,
} from "lucide-react";

/* ── Static data for landing page (mirrors seeded DB) ── */

const LIVE_MARKETS = [
  {
    title: "Will Dangote Refinery export fuel by July?",
    category: "business",
    yes: 45_000,
    no: 32_000,
    traders: 18,
    expires: "60d",
  },
  {
    title: "Super Eagles qualify for World Cup 2026?",
    category: "football",
    yes: 65_000,
    no: 22_000,
    traders: 24,
    expires: "90d",
  },
  {
    title: "Will NYSC be scrapped in 2026?",
    category: "politics",
    yes: 12_000,
    no: 78_000,
    traders: 31,
    expires: "200d",
  },
  {
    title: "Lagos–Ibadan rail daily trips by June?",
    category: "transport",
    yes: 28_000,
    no: 19_000,
    traders: 14,
    expires: "48d",
  },
];

const TOP_PREDICTORS = [
  {
    rank: 1,
    name: "Ngozi I.",
    username: "ngozi_champ",
    winRate: 83,
    rep: 90,
    wagers: 31,
  },
  {
    rank: 2,
    name: "Fatima A.",
    username: "fatima_bet",
    winRate: 72,
    rep: 85,
    wagers: 55,
  },
  {
    rank: 3,
    name: "Tunde A.",
    username: "tunde_risk",
    winRate: 63,
    rep: 80,
    wagers: 19,
  },
  {
    rank: 4,
    name: "Chioma O.",
    username: "chioma_win",
    winRate: 64,
    rep: 78,
    wagers: 28,
  },
  {
    rank: 5,
    name: "Emeka E.",
    username: "emeka_stakes",
    winRate: 62,
    rep: 72,
    wagers: 42,
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section>
          <div className="container-page py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-sm font-medium mb-6">
                  <div className="pulse-dot" />
                  Peer-to-peer prediction market
                </div>
                <h1 className="text-display mb-6">
                  Wager on anything.{" "}
                  <span className="text-[var(--accent)]">
                    Your terms. Your odds.
                  </span>
                </h1>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-lg mb-4">
                  Challenge friends, trade on predictions, and join pools — all
                  with escrow-protected funds. No bookmaker. No house edge. Just
                  you vs. them.
                </p>
                <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] mb-8">
                  <span className="flex items-center gap-1.5">
                    <Lock size={14} className="text-[var(--accent)]" /> Escrow
                    protected
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield size={14} className="text-[var(--accent)]" /> 0%
                    house edge
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/register"
                    className="btn-primary h-12 px-7 text-base"
                  >
                    Start trading predictions
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/explore"
                    className="btn-secondary h-12 px-7 text-base"
                  >
                    Explore markets
                  </Link>
                </div>
              </div>
              <div className="hidden lg:flex justify-center">
                <HeroIllustration className="w-full max-w-md" />
              </div>
            </div>
          </div>
        </section>

        {/* Social proof stats */}
        <section className="bg-[var(--bg-subtle)] border-y border-[var(--border)]">
          <div className="container-page py-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: "₦2.5M+", label: "Total volume" },
                { value: "240+", label: "Active traders" },
                { value: "₦800K+", label: "Paid out" },
                { value: "0%", label: "House edge" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold tabular-nums text-[var(--text)] mb-1">
                    {s.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Markets */}
        <section>
          <div className="container-page py-20">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="pulse-dot" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--gain)]">
                    Live markets
                  </span>
                </div>
                <h2 className="text-headline">Trade on real predictions</h2>
                <p className="text-[var(--text-muted)] mt-2 max-w-md">
                  Take positions on outcomes. Watch the odds shift as others
                  trade.
                </p>
              </div>
              <Link
                href="/markets"
                className="btn-secondary btn-sm hidden sm:inline-flex"
              >
                All markets <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LIVE_MARKETS.map((m) => {
                const total = m.yes + m.no;
                return (
                  <Link
                    key={m.title}
                    href="/markets"
                    className="card-interactive p-5 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] uppercase tracking-wider text-[var(--text-dim)]">
                        {m.category}
                      </span>
                      <span className="text-[11px] text-[var(--text-dim)]">
                        {m.expires} left
                      </span>
                    </div>
                    <h3 className="text-[15px] font-medium leading-snug mb-4 flex-1">
                      {m.title}
                    </h3>
                    <OddsBar yesAmount={m.yes} noAmount={m.no} />
                    <div className="flex items-center justify-between mt-3 text-xs text-[var(--text-muted)]">
                      <span className="tabular-nums">
                        ₦{(total / 1000).toFixed(0)}K vol
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={11} /> {m.traders} traders
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link href="/markets" className="btn-secondary btn-sm">
                All markets <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* How people use Papapa */}
        <section className="bg-[var(--bg-subtle)]">
          <div className="container-page py-20">
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
                  illustration: P2PIllustration,
                  title: "Direct challenges",
                  desc: "1v1 wagers. You set the stakes and terms — they accept or pass. Winner takes the pot.",
                  color: "var(--accent)",
                },
                {
                  icon: Users,
                  illustration: EscrowIllustration,
                  title: "Group pools",
                  desc: "Pool funds with your crew and challenge another group on any outcome. More stakes, bigger pot.",
                  color: "var(--gold)",
                },
                {
                  icon: TrendingUp,
                  illustration: MarketIllustration,
                  title: "Community markets",
                  desc: "Create Yes/No markets on anything measurable. The crowd takes positions. Odds shift in real time.",
                  color: "var(--gain)",
                },
                {
                  icon: Trophy,
                  illustration: EscrowIllustration,
                  title: "Prediction contests",
                  desc: "Compete on prediction accuracy across multiple events. Best forecaster wins the prize pool.",
                  color: "var(--warning)",
                },
              ].map((f) => {
                const Icon = f.icon;
                const Illust = f.illustration;
                return (
                  <div
                    key={f.title}
                    className="rounded-xl bg-white p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-md)] transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="h-10 w-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center">
                        <Icon size={20} style={{ color: f.color }} />
                      </div>
                      <Illust className="w-16 h-16 opacity-60" />
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

        {/* Top Predictors */}
        <section>
          <div className="container-page py-20">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-headline">Top predictors</h2>
                <p className="text-[var(--text-muted)] mt-2 max-w-md">
                  The sharpest minds on Papapa. Can you beat them?
                </p>
              </div>
              <Link
                href="/leaderboard"
                className="btn-secondary btn-sm hidden sm:inline-flex"
              >
                Full leaderboard <ArrowRight size={14} />
              </Link>
            </div>
            <div className="card overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[40px_1fr_80px_80px_80px] gap-4 px-5 py-3 border-b border-[var(--border)] text-xs text-[var(--text-dim)] font-medium">
                <span>#</span>
                <span>Trader</span>
                <span className="text-right">Win rate</span>
                <span className="text-right">Rep</span>
                <span className="text-right">Wagers</span>
              </div>
              {TOP_PREDICTORS.map((p) => (
                <div
                  key={p.username}
                  className="grid grid-cols-[40px_1fr_80px_80px_80px] gap-4 px-5 py-3 items-center border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--surface-2)] transition-colors"
                >
                  <span
                    className={`text-sm font-bold tabular-nums ${p.rank <= 3 ? "text-[var(--gold)]" : "text-[var(--text-dim)]"}`}
                  >
                    {p.rank}
                  </span>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-7 w-7 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-[10px] font-semibold shrink-0">
                      {p.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-[var(--text-dim)]">
                        @{p.username}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-right tabular-nums font-medium text-[var(--gain)]">
                    {p.winRate}%
                  </span>
                  <span className="text-sm text-right tabular-nums">
                    {p.rep}
                  </span>
                  <span className="text-sm text-right tabular-nums text-[var(--text-muted)]">
                    {p.wagers}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link href="/leaderboard" className="btn-secondary btn-sm">
                Full leaderboard <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="bg-[var(--bg-subtle)]">
          <div className="container-page py-20">
            <div className="text-center mb-14">
              <h2 className="text-headline mb-3">Built on trust</h2>
              <p className="text-[var(--text-muted)] max-w-md mx-auto">
                ₦0 lost to platform risk. Every naira is escrow-protected.
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
                  desc: "Outcomes verified against external data. Settlement is automatic — no disputes needed.",
                },
                {
                  icon: Star,
                  title: "Reputation system",
                  desc: "Every user builds a public track record. Win rate, accuracy, and dispute history — all visible.",
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

        {/* How it works */}
        <section>
          <div className="container-page py-20">
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
                  title: "Fund your wallet",
                  desc: "Deposit via Paystack. Instant. Secure.",
                },
                {
                  n: "02",
                  title: "Take a position",
                  desc: "Create a challenge, join a market, or enter a contest.",
                },
                {
                  n: "03",
                  title: "Funds lock in escrow",
                  desc: "Both sides stake. No one can withdraw until it settles.",
                },
                {
                  n: "04",
                  title: "Winner gets paid",
                  desc: "Automatic payout. 10% commission on profit only.",
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
              Start trading predictions today
            </h2>
            <p className="text-white/70 mb-8 max-w-sm mx-auto">
              Join thousands of Nigerians betting peer-to-peer. No bookmaker. No
              house edge. Just you vs. them.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-lg bg-white text-[var(--accent)] font-medium text-base hover:bg-white/90 transition-colors"
              >
                Create your account
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-lg bg-transparent text-white border border-white/30 font-medium text-base hover:bg-white/10 transition-colors"
              >
                Browse markets
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
