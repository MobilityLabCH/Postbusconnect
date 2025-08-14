export const cfg = {
  jwtSecret: process.env.JWT_SECRET || 'dev',
  publicBaseUrl: process.env.PUBLIC_BASE_URL || 'http://localhost:4000'
};
