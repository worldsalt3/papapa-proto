"use client";

import { getInitials } from "@/lib/utils";
import { Star, Trophy, TrendingUp } from "lucide-react";

interface UserAvatarProps {
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  reputationScore: number;
  size?: "sm" | "md" | "lg";
  showReputation?: boolean;
}

export default function UserAvatar({
  username,
  firstName,
  lastName,
  avatarUrl,
  reputationScore,
  size = "md",
  showReputation = true,
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
  };

  const reputationColor =
    reputationScore >= 80
      ? "text-[var(--color-gold)]"
      : reputationScore >= 60
        ? "text-green-400"
        : reputationScore >= 40
          ? "text-yellow-400"
          : "text-red-400";

  const reputationIcon =
    reputationScore >= 80 ? Trophy : reputationScore >= 60 ? Star : TrendingUp;
  const RepIcon = reputationIcon;

  return (
    <div className="flex items-center gap-2">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={username}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-[var(--color-border)]`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] flex items-center justify-center font-bold border-2 border-[var(--color-border)]`}
        >
          {getInitials(`${firstName} ${lastName}`)}
        </div>
      )}
      <div>
        <span className="text-sm font-medium text-[var(--color-text)]">
          @{username}
        </span>
        {showReputation && (
          <div className={`flex items-center gap-1 text-xs ${reputationColor}`}>
            <RepIcon size={12} />
            {reputationScore.toFixed(0)}
          </div>
        )}
      </div>
    </div>
  );
}
