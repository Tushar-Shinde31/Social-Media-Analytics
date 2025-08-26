import { PrismaClient } from "@prisma/client";
import {
  buildInstagramOAuthUrl,
  createStateToken,
  verifyStateToken,
  exchangeCodeForShortLivedToken,
  exchangeForLongLivedToken,
} from "../services/oauth.service.js";
import { getUserPages, getInstagramBusinessId } from "../services/instagram.service.js";

const prisma = new PrismaClient();

export const startInstagramAuth = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const state = createStateToken(userId);
  const url = buildInstagramOAuthUrl(state);
  return res.json({ url });
};

export const instagramAuthCallback = async (req, res) => {
  const { code, state } = req.query;
  if (!code || !state) return res.status(400).json({ error: "Missing code/state" });

  const decoded = verifyStateToken(state);
  if (!decoded) return res.status(400).json({ error: "Invalid state" });
  const userId = decoded.userId;

  try {
    const shortToken = await exchangeCodeForShortLivedToken(code);
    const longToken = await exchangeForLongLivedToken(shortToken);

    // Resolve IG business account id via pages
    let igUserId = null;
    try {
      const pages = await getUserPages(longToken);
      for (const p of pages) {
        const igId = await getInstagramBusinessId(p.id, longToken);
        if (igId) {
          igUserId = igId;
          break;
        }
      }
    } catch (e) {
      console.warn("Could not resolve IG business account id", e);
    }

    await prisma.socialAccount.upsert({
      where: { userId_platform: { userId, platform: "instagram" } },
      update: { accessToken: longToken, refreshToken: igUserId },
      create: { userId, platform: "instagram", accessToken: longToken, refreshToken: igUserId },
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("IG callback error", err);
    return res.status(500).json({ error: "OAuth exchange failed" });
  }
};


