import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "Papapa — Peer-to-Peer Social Betting",
    template: "%s | Papapa",
  },
  description:
    "Papapa is Nigeria's first peer-to-peer social betting marketplace. Create wagers, challenge friends, and bet on anything — sports, culture, politics, entertainment.",
  keywords: [
    "betting",
    "peer-to-peer",
    "social betting",
    "Nigeria",
    "wager",
    "prediction market",
    "sports betting",
  ],
  openGraph: {
    title: "Papapa — Peer-to-Peer Social Betting",
    description:
      "Create wagers, challenge friends, and bet on anything. The social betting marketplace for Nigeria.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body
        className={`${jakarta.className} antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
