import crypto from "crypto";
import jwt from "jsonwebtoken";

const META_APP_ID = process.env.META_APP_ID?.trim();
const META_APP_SECRET = process.env.META_APP_SECRET?.trim();
const IG_REDIRECT_URI = process.env.IG_REDIRECT_URI?.trim();
const JWT_SECRET = process.env.JWT_SECRET;

export const createStateToken = (userId) => {
  const csrf = crypto.randomBytes(16).toString("hex");
  const state = jwt.sign({ userId, csrf }, JWT_SECRET, { expiresIn: "10m" });
  return state;
};

export const verifyStateToken = (stateToken) => {
  try {
    return jwt.verify(stateToken, JWT_SECRET);
  } catch {
    return null;
  }
};

export const buildInstagramOAuthUrl = (state) => {
  const scope = [
    "instagram_basic",
    "pages_show_list",
    "instagram_manage_insights",
  ].join(",");
  const params = new URLSearchParams({
    client_id: META_APP_ID,
    redirect_uri: IG_REDIRECT_URI,
    response_type: "code",
    scope,
    state,
  });
  const url = `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`;
  console.log("[IG OAuth] Using redirect_uri:", IG_REDIRECT_URI);
  return url;
};

export const exchangeCodeForShortLivedToken = async (code) => {
  const body = new URLSearchParams({
    client_id: META_APP_ID,
    client_secret: META_APP_SECRET,
    grant_type: "authorization_code",
    redirect_uri: IG_REDIRECT_URI,
    code,
  });
  const res = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to exchange code: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.access_token;
};

export const exchangeForLongLivedToken = async (shortToken) => {
  const params = new URLSearchParams({
    grant_type: "ig_exchange_token",
    client_secret: META_APP_SECRET,
    access_token: shortToken,
  });
  const res = await fetch(
    `https://graph.instagram.com/access_token?${params.toString()}`
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get long-lived token: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.access_token;
};


