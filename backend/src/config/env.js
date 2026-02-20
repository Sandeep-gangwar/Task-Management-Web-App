const required = ["MONGODB_URI", "JWT_SECRET"];

function loadEnv() {
  // Check required environment variables
  required.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required env var: ${key}`);
    }
  });

  const nodeEnv = process.env.NODE_ENV || "development";
  const isProduction = nodeEnv === "production";

  // Handle CORS origins - can be comma-separated for multiple origins
  const corsOriginEnv = process.env.CORS_ORIGIN || "http://localhost:5173";
  const corsOrigins = corsOriginEnv.split(',').map(origin => origin.trim());

  return {
    nodeEnv,
    port: Number(process.env.PORT || 4000),
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || (isProduction ? "24h" : "7d"),
    corsOrigin: corsOriginEnv, // Keep for backward compatibility
    corsOrigins, // New array for multiple origins
    // Production settings
    isProduction,
    logLevel: process.env.LOG_LEVEL || (isProduction ? "warn" : "debug"),
  };
}

module.exports = { loadEnv };