import Link from "next/link";
import { Users, Clock } from "lucide-react";
import { formatNaira, timeAgo } from "@/lib/utils";
import StatusBadge from "./StatusBadge";

interface WagerCardProps {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: string;
  status: string;
  creatorUsername: string;
  participantCount: number;
  createdAt: string;
  expiresAt?: string;
}

const typeLabel: Record<string, string> = {
  DIRECT_CHALLENGE: "Challenge",
  GROUP_POOL: "Pool",
  COMMUNITY_MARKET: "Market",
  PREDICTION_CONTEST: "Contest",
};

export default function WagerCard({
  id,
  title,
  category,
  amount,
  type,
  status,
  creatorUsername,
  participantCount,
  createdAt,
  expiresAt,
}: WagerCardProps) {
  return (
    <Link
      href={`/wager/${id}`}
      className="card-interactive p-5 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-wider text-[var(--text-dim)]">
          {typeLabel[type] || type} · {category}
        </span>
        <StatusBadge status={status} />
      </div>

      <h3 className="text-[15px] font-medium leading-snug mb-3 line-clamp-2 flex-1">
        {title}
      </h3>

      <div className="flex items-baseline justify-between mb-3">
        <span className="text-lg font-semibold tabular-nums">
          {formatNaira(amount)}
        </span>
        <span className="text-xs text-[var(--text-dim)]">stake</span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
        <span>@{creatorUsername}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Users size={12} /> {participantCount}
          </span>
          {expiresAt && (
            <span className="flex items-center gap-1">
              <Clock size={12} /> {timeAgo(expiresAt)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
