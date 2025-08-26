Backend Setup

Environment variables

Create a .env file in backend/ with:

```
DATABASE_URL=postgresql://user:password@host:5432/db
JWT_SECRET=replace-with-strong-secret
META_APP_ID=your-meta-app-id
META_APP_SECRET=your-meta-app-secret
IG_REDIRECT_URI=http://localhost:4000/api/instagram/auth/callback
PORT=4000
```

Prisma

- Generate client and run migrations:

```
npx prisma generate
npx prisma migrate deploy
```

Instagram Graph API

- Scopes used: instagram_basic, pages_show_list, instagram_manage_insights
- Auth endpoints:
  - GET /api/instagram/auth/start (JWT required): returns url to redirect user
  - GET /api/instagram/auth/callback?code=...&state=...: exchanges code for tokens and saves account
  - POST /api/instagram/sync (JWT required): pulls latest media and stores snapshots

Meta App configuration

- Set Valid OAuth Redirect URIs to IG_REDIRECT_URI
- Add Instagram Basic Display and Pages API (for /me/accounts) permissions
- Add Instagram Graph API with insights permission
- During development, use test users under your Meta app.

Production checklist

- Update IG_REDIRECT_URI to production domain
- Add production domain to app domains and redirect whitelist
- Request App Review for required scopes
- Consider encrypting access tokens at rest


