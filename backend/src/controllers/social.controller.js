import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const connectSocialAccount = async (req, res) => {
  const { platform, accessToken, refreshToken } = req.body;
  const userId = req.user.userId;

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

export const getInstagramPosts = async (req, res) => {
  const userId = req.user.userId;

  try {
    const posts = await prisma.instagramPost.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      select: {
        id: true,
        caption: true,
        mediaUrl: true,
        mediaType: true,
        likeCount: true,
        commentCount: true,
        timestamp: true,
      },
    });

    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Instagram posts" });
  }
};


