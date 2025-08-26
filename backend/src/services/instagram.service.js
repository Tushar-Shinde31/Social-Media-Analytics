const GRAPH_BASE = "https://graph.facebook.com/v19.0";

export const getUserPages = async (accessToken) => {
  const url = `${GRAPH_BASE}/me/accounts?access_token=${encodeURIComponent(accessToken)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch pages: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.data || [];
};

export const getInstagramBusinessId = async (pageId, accessToken) => {
  const url = `${GRAPH_BASE}/${pageId}?fields=instagram_business_account&access_token=${encodeURIComponent(accessToken)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch IG business account: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.instagram_business_account?.id || null;
};

export const fetchRecentMedia = async (igUserId, accessToken) => {
  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "timestamp",
    "comments_count",
    "like_count",
    "permalink",
  ].join(",");
  const url = `${GRAPH_BASE}/${igUserId}/media?fields=${fields}&access_token=${encodeURIComponent(accessToken)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    const isExpired = res.status === 400 && /expired|invalid/i.test(text);
    const err = new Error(`Failed to fetch media: ${res.status} ${text}`);
    err.code = isExpired ? "IG_TOKEN_EXPIRED" : "IG_FETCH_FAILED";
    throw err;
  }
  const data = await res.json();
  return data.data || [];
};


