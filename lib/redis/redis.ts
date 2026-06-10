import { Redis } from '@upstash/redis'
const redis = new Redis({
  url: 'https://eternal-shrew-145296.upstash.io',
  token: 'gQAAAAAAAjeQAAIgcDExMjlkODcxNmQwZmI0MDc0OWE0YWVmMDExZmM2YTdlZA',
})

await redis.set("foo", "bar");
await redis.get("foo");