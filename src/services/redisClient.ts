import Redis from "ioredis";

class RedisService {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT || "6379"),
    });
  }

  async incrementVisit(productId: string, userId: string): Promise<number> {
    const key = `visits:${productId}:${userId}`;
    return await this.client.incr(key);
  }

  async getVisitCount(productId: string, userId: string): Promise<number> {
    const key = `visits:${productId}:${userId}`;
    const count = await this.client.get(key);
    return parseInt(count || "0");
  }
}

export const redisService = new RedisService();
