/**
 * Environment variable validation
 * Validates all required environment variables at startup
 */
require('dotenv').config();

const requiredEnvVars = [
  'MONGO_URI',
  'JWT_SECRET',
  'ADMIN_KEY'
];

const optionalEnvVars = {
  'PORT': '3001',
  'FRONTEND_URL': 'http://localhost:5173',
  'NODE_ENV': 'development'
};

function validateEnv() {
  const missing = [];
  const warnings = [];

  // Check required variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    } else if (envVar === 'JWT_SECRET' && process.env[envVar].length < 32) {
      warnings.push(`JWT_SECRET should be at least 32 characters long for security`);
    } else if (envVar === 'ADMIN_KEY' && process.env[envVar].length < 8) {
      warnings.push(`ADMIN_KEY should be at least 8 characters long for security`);
    }
  }

  // Set defaults for optional variables
  for (const [envVar, defaultValue] of Object.entries(optionalEnvVars)) {
    if (!process.env[envVar]) {
      process.env[envVar] = defaultValue;
    }
  }

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(envVar => console.error(`   - ${envVar}`));
    console.error('\nPlease set these in your .env file');
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Environment variable warnings:');
    warnings.forEach(warning => console.warn(`   - ${warning}`));
  }

  if (process.env.NODE_ENV === 'production') {
    console.log('✅ Running in PRODUCTION mode');
    if (process.env.JWT_SECRET === 'your-secret-key' || process.env.ADMIN_KEY === 'default-admin-key') {
      console.error('❌ CRITICAL: Please change default JWT_SECRET and ADMIN_KEY in production!');
      process.exit(1);
    }
  } else {
    console.log('✅ Running in DEVELOPMENT mode');
  }

  console.log('✅ Environment variables validated');
}

module.exports = validateEnv;

