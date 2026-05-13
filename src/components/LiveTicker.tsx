"use client";

const ACTIVITY_ITEMS = [
  { text: "Chioma won ₦21,600 on Chelsea FA Cup bet", type: "win" as const },
  { text: "New market: Will NYSC be scrapped in 2026?", type: "new" as const },
  {
    text: "Tunde staked ₦20,000 on Dollar hitting ₦2000",
    type: "stake" as const,
  },
  { text: "Fatima's prediction streak hits 8 wins", type: "win" as const },
  { text: "Emeka lost ₦25,000 on Bitcoin $120k bet", type: "loss" as const },
  {
    text: "New pool: AFCON 2027 winner — 5 members joined",
    type: "new" as const,
  },
  { text: "Ngozi's reputation hit 90 — Top Predictor", type: "win" as const },
  {
    text: "₦15,000 wager on Arsenal Premier League title",
    type: "stake" as const,
  },
  { text: "Kelechi won ₦7,200 on Osimhen hat-trick bet", type: "win" as const },
  {
    text: "New contest: Premier League Matchday 38 Predictions",
    type: "new" as const,
  },
  {
    text: "Aisha staked ₦2,000 on BBNaija first eviction",
    type: "stake" as const,
  },
  {
    text: "Market update: Super Eagles World Cup odds at 75%",
    type: "new" as const,
  },
];

const typeColor = {
  win: "text-[var(--gain)]",
  loss: "text-[var(--loss)]",
  new: "text-[var(--accent)]",
  stake: "text-[var(--text-muted)]",
};

const typeIcon = {
  win: "↑",
  loss: "↓",
  new: "●",
  stake: "→",
};

export default function LiveTicker() {
  // Duplicate items for seamless infinite scroll
  const items = [...ACTIVITY_ITEMS, ...ACTIVITY_ITEMS];

  return (
    <div className="bg-[var(--ticker-bg)] border-b border-[var(--border)] overflow-hidden">
      <div className="container-page relative">
        <div className="flex items-center h-8 overflow-hidden">
          <div className="flex items-center gap-1.5 shrink-0 mr-3 pr-3 border-r border-[var(--border)]">
            <div className="pulse-dot" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--gain)]">
              Live
            </span>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="ticker-strip">
              {items.map((item, i) => (
                <span
                  key={i}
                  className="shrink-0 flex items-center gap-1.5 text-xs whitespace-nowrap"
                >
                  <span className={typeColor[item.type]}>
                    {typeIcon[item.type]}
                  </span>
                  <span className="text-[var(--text-muted)]">{item.text}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
