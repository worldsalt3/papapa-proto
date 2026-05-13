import Link from "next/link";
import { Clock, Users } from "lucide-react";
import OddsBar from "./OddsBar";
import { formatNaira } from "@/lib/utils";

interface MarketCardProps {
  id: string;
  title: string;
  category: string;
  totalYesAmount: number;
  totalNoAmount: number;
  positionCount: number;
  expiresAt: string;
  compact?: boolean;
}

function timeLeft(date: string): string {
  const diff = new Date(date).getTime() - Date.now();
  if (diff <= 0) return "Closed";
  const days = Math.floor(diff / 86_400_000);
  if (days > 30) return `${Math.floor(days / 30)}mo left`;
  if (days > 0) return `${days}d left`;
  const hours = Math.floor(diff / 3_600_000);
  return `${hours}h left`;
}

export default function MarketCard({
  id,
  title,
  category,
  totalYesAmount,
  totalNoAmount,
  positionCount,
  expiresAt,
  compact = false,
}: MarketCardProps) {
  const volume = totalYesAmount + totalNoAmount;

  return (
    <Link
      href={`/markets/${id}`}
      className="card-interactive p-5 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-wider text-[var(--text-dim)]">
          {category}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-[var(--text-dim)]">
          <Clock size={10} />
          {timeLeft(expiresAt)}
        </span>
      </div>

      <h3
        className={`font-medium leading-snug mb-4 flex-1 ${compact ? "text-sm line-clamp-2" : "text-[15px] line-clamp-3"}`}
      >
        {title}
      </h3>

      <OddsBar yesAmount={totalYesAmount} noAmount={totalNoAmount} />

      <div className="flex items-center justify-between mt-3 text-xs text-[var(--text-muted)]">
        <span className="tabular-nums">{formatNaira(volume)} vol</span>
        <span className="flex items-center gap-1">
          <Users size={11} /> {positionCount} traders
        </span>
      </div>
    </Link>
  );
}
