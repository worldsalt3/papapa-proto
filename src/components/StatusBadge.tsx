interface StatusBadgeProps {
  status: string;
  className?: string;
}

const cls: Record<string, string> = {
  PENDING: "badge-warning",
  ACTIVE: "badge-accent",
  OPEN: "badge-accent",
  SETTLED: "badge-success",
  RESOLVED: "badge-success",
  DISPUTED: "badge-danger",
  CANCELLED: "badge",
  EXPIRED: "badge",
};

export default function StatusBadge({
  status,
  className = "",
}: StatusBadgeProps) {
  return (
    <span className={`badge ${cls[status] || ""} ${className}`}>{status}</span>
  );
}
