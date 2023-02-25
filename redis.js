const Redis = require("ioredis");

let redis;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL);
} else {
  redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    tls: process.env.REDIS_TLS ? {} : undefined,
  });
}
const redisCacheName = process.env.REDIS_CACHE_NAME;

async function getCachedPublicId(url) {
  const resp = await redis.hget(redisCacheName, url);
  return resp || null;
}

async function setCachedPublicId(url, publicId) {
  await redis.hset(redisCacheName, url, publicId);
}

module.exports = {
  getCachedPublicId,
  setCachedPublicId,
};
