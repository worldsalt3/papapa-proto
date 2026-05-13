import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Papapa <noreply@papapa.ng>";

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
): Promise<boolean> {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Email send failed:", error);
    return false;
  }
}

export async function sendWelcomeEmail(email: string, username: string) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #e0e0e0; padding: 40px; border-radius: 12px;">
      <h1 style="color: #e94560; margin-bottom: 16px;">Welcome to Papapa! 🎯</h1>
      <p>Hey <strong>${username}</strong>,</p>
      <p>You've joined Nigeria's first peer-to-peer social betting marketplace. Here's what you can do:</p>
      <ul>
        <li>🤝 Challenge friends to direct wagers</li>
        <li>🏆 Join prediction contests</li>
        <li>📊 Create community markets</li>
        <li>👥 Pool funds with your crew</li>
      </ul>
      <p>Fund your wallet and start placing your first bet!</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
         style="display: inline-block; background: #e94560; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">
        Go to Dashboard
      </a>
      <p style="color: #8888aa; font-size: 12px; margin-top: 32px;">
        Bet responsibly. You must be 18+ to use Papapa.
      </p>
    </div>
  `;
  return sendEmail(email, "Welcome to Papapa! 🎯", html);
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #e0e0e0; padding: 40px; border-radius: 12px;">
      <h1 style="color: #e94560; margin-bottom: 16px;">Reset Your Password</h1>
      <p>Click the button below to reset your password. This link expires in 1 hour.</p>
      <a href="${resetUrl}" 
         style="display: inline-block; background: #e94560; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">
        Reset Password
      </a>
      <p style="color: #8888aa; font-size: 12px; margin-top: 32px;">
        If you didn't request this, ignore this email.
      </p>
    </div>
  `;
  return sendEmail(email, "Reset Your Papapa Password", html);
}

export async function sendWagerChallengeEmail(
  email: string,
  challengerUsername: string,
  wagerTitle: string,
  amount: number,
) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #e0e0e0; padding: 40px; border-radius: 12px;">
      <h1 style="color: #e94560; margin-bottom: 16px;">You've Been Challenged! ⚡</h1>
      <p><strong>@${challengerUsername}</strong> challenged you to a wager:</p>
      <div style="background: #16213e; padding: 20px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #e94560;">
        <h3 style="margin: 0 0 8px 0;">${wagerTitle}</h3>
        <p style="margin: 0; color: #f5a623; font-size: 20px; font-weight: bold;">₦${amount.toLocaleString()}</p>
      </div>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/wagers" 
         style="display: inline-block; background: #e94560; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
        View Challenge
      </a>
    </div>
  `;
  return sendEmail(
    email,
    `@${challengerUsername} challenged you on Papapa!`,
    html,
  );
}
