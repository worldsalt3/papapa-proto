interface OddsBarProps {
  yesAmount: number;
  noAmount: number;
  height?: number;
  showLabels?: boolean;
}

export default function OddsBar({
  yesAmount,
  noAmount,
  height = 8,
  showLabels = true,
}: OddsBarProps) {
  const total = yesAmount + noAmount;
  const yesPct = total > 0 ? Math.round((yesAmount / total) * 100) : 50;
  const noPct = 100 - yesPct;

  return (
    <div>
      {showLabels && (
        <div className="flex items-center justify-between mb-1.5 text-xs font-medium tabular-nums">
          <span className="text-[var(--yes)]">Yes {yesPct}%</span>
          <span className="text-[var(--no)]">No {noPct}%</span>
        </div>
      )}
      <div className="odds-bar" style={{ height }}>
        <div className="odds-bar-yes" style={{ width: `${yesPct}%` }} />
        <div className="odds-bar-no" style={{ width: `${noPct}%` }} />
      </div>
    </div>
  );
}
