// Commission rate: 10% of winner's profit
export const PLATFORM_COMMISSION_RATE = 0.1;

export function calculateCommission(winnerProfit: number): number {
  return Math.round(winnerProfit * PLATFORM_COMMISSION_RATE * 100) / 100;
}

export function calculatePayout(
  stakeAmount: number,
  totalPool: number,
  winnerContribution: number,
): { payout: number; commission: number; net: number } {
  const winnerProfit = totalPool - winnerContribution;
  const commission = calculateCommission(winnerProfit);
  const payout = winnerContribution + winnerProfit - commission;
  return { payout, commission, net: payout };
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;
}

export function generateReference(prefix: string = "PAP"): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${random}`.toUpperCase();
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function timeAgo(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return then.toLocaleDateString("en-NG", { month: "short", day: "numeric" });
}

export function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    football: "⚽",
    basketball: "🏀",
    politics: "🏛️",
    entertainment: "🎬",
    music: "🎵",
    crypto: "₿",
    culture: "🌍",
    reality_tv: "📺",
    sports: "🏅",
    other: "🎯",
  };
  return map[category.toLowerCase()] || "🎯";
}
