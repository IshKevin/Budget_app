import { createKindeAuthHandler } from '@kinde-oss/kinde-auth-nextjs';

export const { GET, POST } = createKindeAuthHandler({
  issuer: process.env.KINDE_ISSUER_URL,
  clientId: process.env.KINDE_CLIENT_ID,
  clientSecret: process.env.KINDE_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/api/auth/callback',
  postLogoutRedirectUri: 'http://localhost:3000',
});
