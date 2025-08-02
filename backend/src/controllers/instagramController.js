import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const saveInstagramPosts = async (req, res) => {
  const userId = req.user.userId;
  const posts = req.body.posts;   

  try {
    for (const post of posts) {
      await prisma.instagramPost.upsert({
        where: { id: post.id },
        update: {
          caption: post.caption,
          mediaUrl: post.mediaUrl,
          mediaType: post.mediaType,
          likeCount: post.likeCount,
          commentCount: post.commentCount,
          timestamp: new Date(post.timestamp),
        },
        create: {
          id: post.id,
          caption: post.caption,
          mediaUrl: post.mediaUrl,
          mediaType: post.mediaType,
          likeCount: post.likeCount,
          commentCount: post.commentCount,
          timestamp: new Date(post.timestamp),
          userId,
        },
      });
    }

    res.status(200).json({ message: 'Instagram posts saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save Instagram posts' });
  }
};

export const getInstagramPosts = async (req, res) => {
  const userId = req.user.userId;

  try {
    const posts = await prisma.instagramPost.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' }
    });

    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch Instagram posts' });
  }
};