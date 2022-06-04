require('dotenv').config()
export const Configuration = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  SESSION_EXPIRY: process.env.SESSION_EXPIRY,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  WHITELISTED_DOMAINS: process.env.WHITELISTED_DOMAINS,
  BACKEND_PORT: process.env.BACKEND_PORT,
  MAX_TIMESTAMPS: parseInt(process.env.MAX_TIMESTAMPS || '0'),
  SERVICE_URL: process.env.SERVICE_URL || 'http://localhost:3001'
}
