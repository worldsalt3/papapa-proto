import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import pg from "pg";
import bcrypt from "bcryptjs";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ── Helpers ──────────────────────────────────────────────
function daysFromNow(n: number) {
  return new Date(Date.now() + n * 86_400_000);
}
function daysAgo(n: number) {
  return new Date(Date.now() - n * 86_400_000);
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  console.log("🌱 Seeding database…");

  // ── 1. Users ────────────────────────────────────────────
  const password = await bcrypt.hash("Password1!", 12);

  const usersData = [
    {
      username: "chioma_win",
      email: "chioma@demo.papapa.ng",
      firstName: "Chioma",
      lastName: "Okafor",
      bio: "Lagos girl who bets on everything 🎯",
      balance: 45_000,
      totalWagers: 28,
      wagersWon: 18,
      wagersLost: 8,
      reputationScore: 78,
    },
    {
      username: "emeka_stakes",
      email: "emeka@demo.papapa.ng",
      firstName: "Emeka",
      lastName: "Eze",
      bio: "Football analyst. My predictions pay.",
      balance: 32_500,
      totalWagers: 42,
      wagersWon: 26,
      wagersLost: 14,
      reputationScore: 72,
    },
    {
      username: "fatima_bet",
      email: "fatima@demo.papapa.ng",
      firstName: "Fatima",
      lastName: "Abdullahi",
      bio: "Prediction queen 👑 Abuja",
      balance: 67_200,
      totalWagers: 55,
      wagersWon: 38,
      wagersLost: 15,
      reputationScore: 85,
    },
    {
      username: "tunde_risk",
      email: "tunde@demo.papapa.ng",
      firstName: "Tunde",
      lastName: "Adeyemi",
      bio: "High stakes only. No small bets.",
      balance: 120_000,
      totalWagers: 19,
      wagersWon: 12,
      wagersLost: 5,
      reputationScore: 80,
    },
    {
      username: "aisha_odds",
      email: "aisha@demo.papapa.ng",
      firstName: "Aisha",
      lastName: "Bello",
      bio: "Math grad who loves odds 📊",
      balance: 28_800,
      totalWagers: 35,
      wagersWon: 20,
      wagersLost: 13,
      reputationScore: 68,
    },
    {
      username: "kelechi_p2p",
      email: "kelechi@demo.papapa.ng",
      firstName: "Kelechi",
      lastName: "Nwosu",
      bio: "Port Harcourt. Challenge me.",
      balance: 15_400,
      totalWagers: 12,
      wagersWon: 6,
      wagersLost: 5,
      reputationScore: 55,
    },
    {
      username: "ngozi_champ",
      email: "ngozi@demo.papapa.ng",
      firstName: "Ngozi",
      lastName: "Ibe",
      bio: "Undefeated streak loading…",
      balance: 88_000,
      totalWagers: 31,
      wagersWon: 24,
      wagersLost: 5,
      reputationScore: 90,
    },
    {
      username: "yusuf_sharp",
      email: "yusuf@demo.papapa.ng",
      firstName: "Yusuf",
      lastName: "Musa",
      bio: "Kano boy. Sharp instincts.",
      balance: 22_000,
      totalWagers: 18,
      wagersWon: 10,
      wagersLost: 7,
      reputationScore: 62,
    },
    // Test user with easy login
    {
      username: "testuser",
      email: "test@papapa.ng",
      firstName: "Test",
      lastName: "User",
      bio: "Demo account for testers",
      balance: 50_000,
      totalWagers: 0,
      wagersWon: 0,
      wagersLost: 0,
      reputationScore: 50,
    },
  ];

  const users = [];
  for (const u of usersData) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        username: u.username,
        email: u.email,
        passwordHash: password,
        firstName: u.firstName,
        lastName: u.lastName,
        bio: u.bio,
        balance: u.balance,
        isVerified: true,
        kycStatus: "VERIFIED",
        totalWagers: u.totalWagers,
        wagersWon: u.wagersWon,
        wagersLost: u.wagersLost,
        reputationScore: u.reputationScore,
        disputesRaised: 0,
        disputesLost: 0,
      },
    });
    users.push(user);
  }

  console.log(`  ✓ ${users.length} users`);

  const [chioma, emeka, fatima, tunde, aisha, kelechi, ngozi, yusuf, testUser] =
    users;

  // ── 2. Wagers (Direct Challenges) ──────────────────────
  const wagersData = [
    // Active wagers (open for acceptance)
    {
      title: "Nigeria vs Ghana — AFCON qualifier",
      description:
        "Nigeria wins the AFCON qualifier match against Ghana on June 15. Straight win, no draws.",
      category: "football",
      amount: 5_000,
      type: "DIRECT_CHALLENGE" as const,
      status: "PENDING" as const,
      creator: chioma,
      eventDate: daysFromNow(12),
    },
    {
      title: "Wizkid drops album before August",
      description:
        "Wizkid releases a full studio album (not EP or single) before August 1, 2026.",
      category: "entertainment",
      amount: 10_000,
      type: "DIRECT_CHALLENGE" as const,
      status: "PENDING" as const,
      creator: emeka,
      eventDate: daysFromNow(45),
    },
    {
      title: "Dollar will hit ₦2000 this month",
      description:
        "The parallel market USD/NGN rate will touch ₦2,000 before end of May 2026.",
      category: "finance",
      amount: 20_000,
      type: "DIRECT_CHALLENGE" as const,
      status: "PENDING" as const,
      creator: tunde,
      eventDate: daysFromNow(18),
    },
    {
      title: "Tinubu travels abroad before June",
      description:
        "President Tinubu will make at least one international trip before June 1, 2026.",
      category: "politics",
      amount: 3_000,
      type: "DIRECT_CHALLENGE" as const,
      status: "PENDING" as const,
      creator: fatima,
      eventDate: daysFromNow(19),
    },
    {
      title: "Arsenal wins the Premier League",
      description: "Arsenal FC wins the 2025/26 English Premier League title.",
      category: "football",
      amount: 15_000,
      type: "DIRECT_CHALLENGE" as const,
      status: "PENDING" as const,
      creator: ngozi,
      eventDate: daysFromNow(5),
    },
    {
      title: "BBNaija Season 10 first eviction",
      description:
        "The first housemate evicted from BBNaija Season 10 will be male.",
      category: "entertainment",
      amount: 2_000,
      type: "DIRECT_CHALLENGE" as const,
      status: "PENDING" as const,
      creator: aisha,
      eventDate: daysFromNow(30),
    },
    {
      title: "ASUU won't strike in 2026",
      description: "ASUU will not go on strike for the remainder of 2026.",
      category: "education",
      amount: 5_000,
      type: "DIRECT_CHALLENGE" as const,
      status: "PENDING" as const,
      creator: yusuf,
      eventDate: daysFromNow(200),
    },

    // Active wagers (accepted, in progress)
    {
      title: "Man United finishes top 4",
      description:
        "Manchester United finishes in the Premier League top 4 for 2025/26 season.",
      category: "football",
      amount: 8_000,
      type: "DIRECT_CHALLENGE" as const,
      status: "ACTIVE" as const,
      creator: emeka,
      opponent: kelechi,
      eventDate: daysFromNow(8),
    },
    {
      title: "Davido vs Burna Boy — who charts higher",
      description:
        "Davido's next single charts higher than Burna Boy's next single on Apple Music Nigeria.",
      category: "entertainment",
      amount: 7_500,
      type: "DIRECT_CHALLENGE" as const,
      status: "ACTIVE" as const,
      creator: chioma,
      opponent: fatima,
      eventDate: daysFromNow(20),
    },
    {
      title: "Fuel price stays below ₦800",
      description:
        "PMS retail price stays below ₦800/litre through the end of June.",
      category: "finance",
      amount: 10_000,
      type: "DIRECT_CHALLENGE" as const,
      status: "ACTIVE" as const,
      creator: tunde,
      opponent: ngozi,
      eventDate: daysFromNow(48),
    },

    // Settled wagers (completed)
    {
      title: "Chelsea wins FA Cup 2026",
      description: "Chelsea wins the 2025/26 FA Cup final.",
      category: "football",
      amount: 12_000,
      type: "DIRECT_CHALLENGE" as const,
      status: "SETTLED" as const,
      creator: emeka,
      opponent: aisha,
      outcome: "Creator wins",
      resolvedAt: daysAgo(3),
    },
    {
      title: "Bitcoin hits $120k in April",
      description:
        "Bitcoin price touches $120,000 at any point during April 2026.",
      category: "crypto",
      amount: 25_000,
      type: "DIRECT_CHALLENGE" as const,
      status: "SETTLED" as const,
      creator: tunde,
      opponent: yusuf,
      outcome: "Opponent wins",
      resolvedAt: daysAgo(14),
    },
    {
      title: "Osimhen scores hat-trick this month",
      description:
        "Victor Osimhen scores a hat-trick in any competitive match in April 2026.",
      category: "football",
      amount: 4_000,
      type: "DIRECT_CHALLENGE" as const,
      status: "SETTLED" as const,
      creator: kelechi,
      opponent: chioma,
      outcome: "Creator wins",
      resolvedAt: daysAgo(7),
    },
  ];

  const wagers = [];
  for (const w of wagersData) {
    const wager = await prisma.wager.create({
      data: {
        title: w.title,
        description: w.description,
        category: w.category,
        amount: w.amount,
        type: w.type,
        status: w.status,
        visibility: "PUBLIC",
        odds: "1:1",
        eventDate: w.eventDate,
        expiresAt: w.eventDate
          ? new Date(w.eventDate.getTime() + 86_400_000)
          : daysFromNow(30),
        outcome: (w as any).outcome ?? null,
        resolvedAt: (w as any).resolvedAt ?? null,
        creatorId: w.creator.id,
      },
    });

    // Creator participant
    await prisma.wagerParticipant.create({
      data: {
        wagerId: wager.id,
        userId: w.creator.id,
        side: "for",
        amount: w.amount,
        status: w.status === "PENDING" ? "PENDING" : "ACCEPTED",
        payout:
          w.status === "SETTLED" && (w as any).outcome === "Creator wins"
            ? w.amount * 2 * 0.9
            : null,
      },
    });

    // Opponent participant (for active/settled)
    if ((w as any).opponent) {
      await prisma.wagerParticipant.create({
        data: {
          wagerId: wager.id,
          userId: (w as any).opponent.id,
          side: "against",
          amount: w.amount,
          status: "ACCEPTED",
          payout:
            w.status === "SETTLED" && (w as any).outcome === "Opponent wins"
              ? w.amount * 2 * 0.9
              : null,
        },
      });
    }

    // Escrow for active wagers
    if (w.status === "ACTIVE") {
      await prisma.escrowHold.create({
        data: { wagerId: wager.id, amount: w.amount * 2, status: "HELD" },
      });
    }
    if (w.status === "SETTLED") {
      await prisma.escrowHold.create({
        data: {
          wagerId: wager.id,
          amount: w.amount * 2,
          status: "RELEASED",
          releasedAt: (w as any).resolvedAt,
        },
      });
    }

    wagers.push(wager);
  }

  console.log(`  ✓ ${wagers.length} wagers`);

  // ── 3. Markets ──────────────────────────────────────────
  const marketsData = [
    {
      title: "Will Dangote Refinery export fuel by July?",
      description:
        "Dangote Refinery begins exporting refined petroleum products to another country before July 31, 2026.",
      category: "business",
      expiresAt: daysFromNow(60),
      totalYes: 45_000,
      totalNo: 32_000,
    },
    {
      title: "Will NYSC be scrapped in 2026?",
      description:
        "The Nigerian National Youth Service Corps (NYSC) programme is officially scrapped or replaced by legislation in 2026.",
      category: "politics",
      expiresAt: daysFromNow(200),
      totalYes: 12_000,
      totalNo: 78_000,
    },
    {
      title: "Lagos to Ibadan rail — daily trips by June?",
      description:
        "The Lagos-Ibadan standard gauge railway runs daily scheduled commercial trips (not test runs) by June 30, 2026.",
      category: "transport",
      expiresAt: daysFromNow(48),
      totalYes: 28_000,
      totalNo: 19_000,
    },
    {
      title: "Super Eagles qualify for World Cup 2026?",
      description:
        "Nigeria's Super Eagles qualify for the 2026 FIFA World Cup.",
      category: "football",
      expiresAt: daysFromNow(90),
      totalYes: 65_000,
      totalNo: 22_000,
    },
    {
      title: "Will Starlink drop prices in Nigeria by July?",
      description:
        "SpaceX Starlink reduces its Nigeria monthly subscription price below ₦25,000 before July 31, 2026.",
      category: "Tech",
      expiresAt: daysFromNow(55),
      totalYes: 18_000,
      totalNo: 42_000,
    },
    {
      title: "Bitcoin above $100k by December 2026?",
      description:
        "Bitcoin price is above $100,000 USD on CoinMarketCap at midnight UTC on December 31, 2026.",
      category: "Crypto",
      expiresAt: daysFromNow(180),
      totalYes: 90_000,
      totalNo: 35_000,
    },
    {
      title: "Asake wins Grammy in 2027?",
      description: "Asake wins at least one Grammy Award at the 2027 ceremony.",
      category: "Entertainment",
      expiresAt: daysFromNow(250),
      totalYes: 22_000,
      totalNo: 55_000,
    },
    {
      title: "Naira stronger than ₦1500/$ by Sept?",
      description:
        "The CBN official exchange rate for USD/NGN is below ₦1,500 on September 1, 2026.",
      category: "Politics",
      expiresAt: daysFromNow(100),
      totalYes: 8_000,
      totalNo: 72_000,
    },
    {
      title: "Will a Nigerian club win CAF Champions League?",
      description:
        "A Nigerian club (Enyimba, Rangers, etc.) wins the 2026 CAF Champions League.",
      category: "Sports",
      expiresAt: daysFromNow(150),
      totalYes: 5_000,
      totalNo: 38_000,
    },
    {
      title: "Lagos metro Blue Line hits 50k daily riders?",
      description:
        "Lagos Rail Mass Transit Blue Line averages 50,000+ daily riders for any calendar month in 2026.",
      category: "Culture",
      expiresAt: daysFromNow(120),
      totalYes: 30_000,
      totalNo: 25_000,
    },
  ];

  for (const m of marketsData) {
    const market = await prisma.market.create({
      data: {
        title: m.title,
        description: m.description,
        category: m.category,
        status: "ACTIVE",
        expiresAt: m.expiresAt,
        totalYesAmount: m.totalYes,
        totalNoAmount: m.totalNo,
        creatorId: pick(users).id,
      },
    });

    // Add 3-5 positions per market
    const positioners = users.sort(() => Math.random() - 0.5).slice(0, 4);
    for (const u of positioners) {
      const side = Math.random() > 0.4 ? "YES" : "NO";
      const amount = [1_000, 2_000, 3_000, 5_000, 8_000][
        Math.floor(Math.random() * 5)
      ];
      try {
        await prisma.marketPosition.create({
          data: { marketId: market.id, userId: u.id, side, amount },
        });
      } catch {
        // skip duplicate
      }
    }
  }

  console.log(`  ✓ ${marketsData.length} markets`);

  // ── 4. Pools ────────────────────────────────────────────
  const poolsData = [
    {
      title: "AFCON 2027 winner — pool bet",
      description:
        "Group bet on which country wins AFCON 2027. Pick a side and stake.",
      category: "football",
      totalAmount: 40_000,
      status: "ACTIVE" as const,
    },
    {
      title: "Next governor of Lagos",
      description:
        "Who becomes the next governor of Lagos State? Pool your bets.",
      category: "politics",
      totalAmount: 25_000,
      status: "PENDING" as const,
    },
    {
      title: "Which Nigerian artist gets 1B Spotify streams first?",
      description:
        "Pool bet on who hits 1 billion total Spotify streams first — Burna Boy, Wizkid, Davido, or Rema.",
      category: "entertainment",
      totalAmount: 55_000,
      status: "ACTIVE" as const,
    },
    {
      title: "Premier League Golden Boot 2025/26",
      description:
        "Who wins the Premier League Golden Boot? Pool up and pick your player.",
      category: "football",
      totalAmount: 80_000,
      status: "ACTIVE" as const,
    },
  ];

  for (const p of poolsData) {
    const pool = await prisma.pool.create({
      data: {
        title: p.title,
        description: p.description,
        category: p.category,
        totalAmount: p.totalAmount,
        status: p.status,
        eventDate: daysFromNow(120),
        expiresAt: daysFromNow(115),
      },
    });

    const members = users.sort(() => Math.random() - 0.5).slice(0, 5);
    for (const u of members) {
      const amount = [2_000, 5_000, 8_000][Math.floor(Math.random() * 3)];
      try {
        await prisma.poolMember.create({
          data: {
            poolId: pool.id,
            userId: u.id,
            side: pick(["Side A", "Side B"]),
            amount,
          },
        });
      } catch {
        // skip duplicate
      }
    }
  }

  console.log(`  ✓ ${poolsData.length} pools`);

  // ── 5. Contests ─────────────────────────────────────────
  const contest = await prisma.contest.create({
    data: {
      title: "Premier League Matchday 38 Predictions",
      description:
        "Predict all 10 results on the final matchday. Closest predictions win the pool.",
      category: "football",
      entryFee: 2_000,
      prizePool: 16_000,
      status: "ACTIVE",
      startsAt: daysFromNow(2),
      endsAt: daysFromNow(3),
    },
  });

  const contestEvents = [
    "Arsenal vs Everton",
    "Man City vs Bournemouth",
    "Liverpool vs Crystal Palace",
    "Chelsea vs Newcastle",
    "Tottenham vs Brentford",
  ];

  const events = [];
  for (const title of contestEvents) {
    const ev = await prisma.contestEvent.create({
      data: { contestId: contest.id, title },
    });
    events.push(ev);
  }

  // 4 entrants
  const entrants = [chioma, emeka, fatima, tunde];
  for (const u of entrants) {
    const entry = await prisma.contestEntry.create({
      data: { contestId: contest.id, userId: u.id },
    });
    for (const ev of events) {
      await prisma.contestPrediction.create({
        data: {
          entryId: entry.id,
          eventId: ev.id,
          predictedResult: pick(["Home Win", "Draw", "Away Win"]),
        },
      });
    }
  }

  console.log(
    `  ✓ 1 contest with ${events.length} events & ${entrants.length} entries`,
  );

  // Second contest
  const contest2 = await prisma.contest.create({
    data: {
      title: "AFCON 2027 Group Stage Predictions",
      description:
        "Predict the results of all group stage matches. Top 3 share the prize pool.",
      category: "football",
      entryFee: 5_000,
      prizePool: 40_000,
      status: "PENDING",
      startsAt: daysFromNow(30),
      endsAt: daysFromNow(45),
    },
  });

  const contest2Events = [
    "Nigeria vs Cameroon",
    "Ghana vs Senegal",
    "Egypt vs Morocco",
    "Ivory Coast vs Algeria",
  ];
  for (const title of contest2Events) {
    await prisma.contestEvent.create({
      data: { contestId: contest2.id, title },
    });
  }

  console.log(`  ✓ 2nd contest with ${contest2Events.length} events`);

  // ── 6. Transactions ─────────────────────────────────────
  const txUsers = [chioma, emeka, fatima, tunde, ngozi, testUser];
  let txCount = 0;
  for (const u of txUsers) {
    const ref = `seed_dep_${u.id}`;
    const exists = await prisma.transaction.findFirst({
      where: { reference: ref },
    });
    if (!exists) {
      await prisma.transaction.create({
        data: {
          userId: u.id,
          type: "DEPOSIT",
          amount: u.balance,
          status: "SUCCESS",
          description: "Initial deposit via Paystack",
          reference: ref,
        },
      });
      txCount++;
    }
  }

  // Wager stake transactions for settled wagers
  for (const w of wagersData.filter((w) => w.status === "SETTLED")) {
    const ref = `seed_stake_${w.creator.id}_${w.title.slice(0, 20).replace(/\s/g, "_")}`;
    const exists = await prisma.transaction.findFirst({
      where: { reference: ref },
    });
    if (!exists) {
      await prisma.transaction.create({
        data: {
          userId: w.creator.id,
          type: "WAGER_STAKE",
          amount: -w.amount,
          status: "SUCCESS",
          description: `Stake on "${w.title}"`,
          reference: ref,
        },
      });
      txCount++;
    }
  }

  console.log(`  ✓ ${txCount} transactions`);

  // ── 7. Notifications ───────────────────────────────────
  const notifications = [
    {
      userId: testUser.id,
      type: "welcome",
      title: "Welcome to Papapa!",
      message:
        "Your account is set up. Explore open wagers or create your first challenge.",
      link: "/explore",
    },
    {
      userId: testUser.id,
      type: "deposit",
      title: "Deposit successful",
      message: "₦50,000 has been added to your wallet.",
      link: "/dashboard",
    },
    {
      userId: chioma.id,
      type: "wager_accepted",
      title: "Wager accepted!",
      message:
        "Fatima accepted your wager: Davido vs Burna Boy — who charts higher",
      link: "/dashboard",
    },
    {
      userId: emeka.id,
      type: "wager_settled",
      title: "You won!",
      message: "You won ₦21,600 on Chelsea wins FA Cup 2026.",
      link: "/dashboard",
    },
    {
      userId: ngozi.id,
      type: "wager_created",
      title: "New challenge for you",
      message: "Tunde created a ₦10,000 wager on fuel prices. Accept?",
      link: "/explore",
    },
  ];

  for (const n of notifications) {
    await prisma.notification.create({ data: n });
  }

  console.log(`  ✓ ${notifications.length} notifications`);

  // ── 8. Newsletter ───────────────────────────────────────
  const emails = [
    "fan1@example.com",
    "fan2@example.com",
    "earlybird@example.com",
  ];
  for (const email of emails) {
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });
  }

  console.log(`  ✓ ${emails.length} newsletter subscribers`);
  console.log("\n✅ Seed complete!");
  console.log("\n📋 Test account:");
  console.log("   Email:    test@papapa.ng");
  console.log("   Password: Password1!");
  console.log("   Balance:  ₦50,000\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
