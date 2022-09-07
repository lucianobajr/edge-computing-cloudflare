import { Redis } from "@upstash/redis/cloudflare";

export interface Env {
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const redis = new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    });

    if (request.url.endsWith('/get')) {
      const access_count = await redis.get('access_count');

      return new Response(
        JSON.stringify({
          access_count,
        })
      );
    } else {
      const access_count = await redis.incr('access_count');

      return new Response(
        JSON.stringify({
          access_count,
        })
      );
    }
  },
};
