# Papapa — Peer-to-Peer Social Betting Marketplace

Nigeria's first peer-to-peer social betting platform. Users create wagers, challenge friends, and bet against each other — never against the house.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind CSS 4
- **Auth**: JWT (jose) + bcryptjs
- **Payments**: Paystack
- **Email**: Resend

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env
   ```

   Fill in your database URL, JWT secret, Paystack keys, and Resend API key.

3. **Push database schema**:

   ```bash
   npx prisma db push
   ```

4. **Generate Prisma client**:

   ```bash
   npx prisma generate
   ```

5. **Run development server**:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── login/                # Login page
│   ├── register/             # Registration page
│   ├── dashboard/            # User dashboard
│   │   └── create-wager/     # Create wager form
│   ├── explore/              # Browse public wagers
│   ├── how-it-works/         # How it works page
│   └── api/
│       ├── auth/             # Register, login, logout
│       ├── user/             # User dashboard data
│       ├── wagers/           # CRUD + accept/settle wagers
│       ├── payments/         # Paystack deposit/verify
│       └── disputes/         # Dispute creation
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Toast.tsx
│   ├── WagerCard.tsx
│   └── UserAvatar.tsx
├── lib/
│   ├── auth.ts               # JWT token helpers
│   ├── prisma.ts             # Prisma client
│   ├── paystack.ts           # Paystack API
│   ├── mail.ts               # Email templates
│   └── utils.ts              # Commission, formatting, helpers
└── middleware.ts              # Auth middleware
```

## Core Features

- **Direct Challenges**: 1v1 wagers between users
- **Group Pools**: Team vs team betting
- **Community Markets**: User-created Yes/No prediction markets
- **Prediction Contests**: Multi-event accuracy competitions
- **Escrow System**: All stakes locked until settlement
- **Reputation System**: Public scores based on wager history
- **Multi-layer Dispute Resolution**: Auto → Community → Admin review
- **10% Commission**: Only on winner's profit, transparent
