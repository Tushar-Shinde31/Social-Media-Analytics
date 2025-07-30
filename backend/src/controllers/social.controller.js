import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Save or update connected social account
 * Expected: req.body = { platform, accessToken, refreshToken }
 * Assumes req.user is already available via auth middleware
 */
export const connectSocialAccount = async (req, res) => {
  const { platform, accessToken, refreshToken } = req.body;
  const userId = req.user.userId; // comes from JWT middleware

  try {
    const existing = await prisma.socialAccount.findUnique({
      where: {
        userId_platform: {
          userId,
          platform: platform.toLowerCase(),
        },
      },
    });

    if (existing) {
      await prisma.socialAccount.update({
        where: {
          userId_platform: {
            userId,
            platform: platform.toLowerCase(),
          },
        },
        data: {
          accessToken,
          refreshToken,
          connectedAt: new Date(),
        },
      });
    } else {
      await prisma.socialAccount.create({
        data: {
          userId,
          platform: platform.toLowerCase(),
          accessToken,
          refreshToken,
        },
      });
    }

    res.json({ message: `${platform} account connected` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to connect account" });
  }
};

export const getConnectedAccounts = async (req, res) => {
  const userId = req.user.userId;

  try {
    const accounts = await prisma.socialAccount.findMany({
      where: { userId },
      select: {
        platform: true,
        connectedAt: true,
      },
    });

    res.json({ connected: accounts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch connected accounts" });
  }
};


