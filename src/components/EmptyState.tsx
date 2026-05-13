import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; href: string };
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="card flex flex-col items-center text-center py-14 px-6">
      <div className="h-12 w-12 rounded-xl bg-[var(--surface-3)] flex items-center justify-center text-[var(--text-muted)] mb-4">
        <Icon size={20} />
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-[var(--text-muted)] max-w-sm">{description}</p>
      {action && (
        <Link href={action.href} className="btn-primary mt-5">
          {action.label}
        </Link>
      )}
    </div>
  );
}
