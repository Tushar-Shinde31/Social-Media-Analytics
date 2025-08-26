import { PrismaClient } from "@prisma/client";
import { fetchRecentMedia } from "../services/instagram.service.js";

const prisma = new PrismaClient();

export const syncInstagram = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const account = await prisma.socialAccount.findUnique({
    where: { userId_platform: { userId, platform: "instagram" } },
  });
  if (!account?.accessToken) {
    return res.status(401).json({ error: "IG not connected", code: "IG_TOKEN_EXPIRED" });
  }

  try {
    // In a full flow, resolve igUserId via pages. For now, assume token corresponds to IG user.
    // If you maintain igUserId in DB, read it here. Placeholder: use token to call media endpoint requiring ig user id.
    // To keep it deterministic, require igUserId stored in SocialAccount.refreshToken field if present.
    const igUserId = account.refreshToken || null;
    if (!igUserId) {
      // If missing, we could later implement the /me/accounts flow and persist igUserId.
      // For now, return a helpful message.
      return res.status(400).json({ error: "Missing IG user id; reconnect account" });
    }

    const media = await fetchRecentMedia(igUserId, account.accessToken);

    const normalized = [];
    for (const m of media) {
      const record = {
        id: m.id,
        caption: m.caption || null,
        mediaUrl: m.media_url || null,
        mediaType: m.media_type,
        likeCount: m.like_count ?? 0,
        commentCount: m.comments_count ?? 0,
        timestamp: new Date(m.timestamp),
        userId,
      };
      await prisma.instagramPost.upsert({
        where: { id: record.id },
        update: {
          caption: record.caption,
          mediaUrl: record.mediaUrl,
          mediaType: record.mediaType,
          likeCount: record.likeCount,
          commentCount: record.commentCount,
          timestamp: record.timestamp,
        },
        create: record,
      });

      await prisma.igPostMetricDaily.create({
        data: {
          postId: record.id,
          likeCount: record.likeCount,
          commentCount: record.commentCount,
        },
      });

      normalized.push({
        id: record.id,
        caption: record.caption,
        mediaUrl: record.mediaUrl,
        mediaType: record.mediaType,
        likeCount: record.likeCount,
        commentCount: record.commentCount,
        timestamp: record.timestamp.toISOString(),
        permalink: m.permalink || null,
      });
    }

    return res.json({ posts: normalized });
  } catch (err) {
    if (err.code === "IG_TOKEN_EXPIRED") {
      return res.status(401).json({ error: "Token expired", code: "IG_TOKEN_EXPIRED" });
    }
    console.error("IG sync error", err);
    return res.status(500).json({ error: "Failed to sync Instagram" });
  }
};


