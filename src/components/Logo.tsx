export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Papapa"
    >
      <rect x="4" y="4" width="6.5" height="24" rx="3.25" fill="#059669" />
      <rect x="13" y="4" width="6.5" height="16" rx="3.25" fill="#059669" />
      <rect
        x="22"
        y="4"
        width="6.5"
        height="10"
        rx="3.25"
        fill="#059669"
        opacity="0.55"
      />
    </svg>
  );
}
