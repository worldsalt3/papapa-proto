import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import {
  Wallet,
  Plus,
  Users,
  Trophy,
  Shield,
  Scale,
  Zap,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    n: 1,
    title: "Fund your wallet",
    description:
      "Deposit via Paystack — cards, transfer, USSD. Funds appear instantly.",
    icon: Wallet,
  },
  {
    n: 2,
    title: "Create or accept a wager",
    description:
      "Post a challenge with stake, odds, and conditions. Or accept any open wager.",
    icon: Plus,
  },
  {
    n: 3,
    title: "Both stakes lock in escrow",
    description:
      "Funds are held safely until the event resolves. No one can withdraw mid-wager.",
    icon: Shield,
  },
  {
    n: 4,
    title: "Winner takes the pot",
    description:
      "Outcome is verified, funds are released, and reputation is updated.",
    icon: Trophy,
  },
];

const types = [
  {
    title: "Direct challenges",
    description: "1v1 wagers between two users. Pick a side, name your stake.",
    icon: Zap,
  },
  {
    title: "Group pools",
    description:
      "Multiple users contribute to one pool. Winners split the pot.",
    icon: Users,
  },
  {
    title: "Community markets",
    description:
      "Open YES/NO markets. Anyone can take a position on either side.",
    icon: TrendingUp,
  },
  {
    title: "Prediction contests",
    description:
      "Compete on forecast accuracy. Best predictor over multiple events wins.",
    icon: Trophy,
  },
];

const safety = [
  {
    title: "Escrow protection",
    description: "All stakes are held by the platform until settlement.",
    icon: Shield,
  },
  {
    title: "Reputation system",
    description:
      "Every wager affects your score. Repeat offenders are restricted.",
    icon: Scale,
  },
  {
    title: "Dispute resolution",
    description:
      "Disagreements go to community vote. Outcomes are transparent.",
    icon: Users,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Intro */}
        <section>
          <div className="container-page py-16 md:py-20 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
              Peer-to-peer wagers, with escrow.
            </h1>
            <p className="text-[var(--text-muted)]">
              Papapa lets you wager directly with other users on anything
              measurable. Funds are held in escrow until the outcome is
              verified. No bookmaker. No house edge.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="bg-[var(--bg-subtle)]">
          <div className="container-page py-16">
            <h2 className="text-xl font-semibold mb-6">Four steps</h2>
            <div className="card p-0 overflow-hidden bg-[var(--bg)]">
              <ul className="divide-y divide-[var(--border)]">
                {steps.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.n} className="flex gap-4 p-5">
                      <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center text-sm font-bold tabular-nums shrink-0 text-[var(--accent)]">
                        {s.n}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon
                            size={14}
                            className="text-[var(--text-muted)]"
                          />
                          <div className="text-sm font-medium">{s.title}</div>
                        </div>
                        <div className="text-sm text-[var(--text-muted)]">
                          {s.description}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* Wager types */}
        <section>
          <div className="container-page py-16">
            <h2 className="text-xl font-semibold mb-1">Four wager types</h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Pick the format that matches what you want to bet on.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {types.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.title} className="card p-6">
                    <Icon size={18} className="text-[var(--text-dim)] mb-3" />
                    <div className="text-sm font-semibold mb-1">{t.title}</div>
                    <div className="text-sm text-[var(--text-muted)]">
                      {t.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Safety */}
        <section className="bg-[var(--bg-subtle)]">
          <div className="container-page py-16">
            <h2 className="text-xl font-semibold mb-1">How we keep it fair</h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Three safeguards built into every wager.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {safety.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="card p-6">
                    <Icon size={18} className="text-[var(--text-dim)] mb-3" />
                    <div className="text-sm font-semibold mb-1">{s.title}</div>
                    <div className="text-sm text-[var(--text-muted)]">
                      {s.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="container-page py-16">
            <div className="card text-center max-w-xl mx-auto">
              <h3 className="text-lg font-semibold mb-1">Ready to wager?</h3>
              <p className="text-sm text-[var(--text-muted)] mb-5">
                Sign up in under a minute. No deposit required to browse.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Link href="/register" className="btn-primary">
                  Create account
                </Link>
                <Link href="/explore" className="btn-secondary">
                  Browse wagers
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
