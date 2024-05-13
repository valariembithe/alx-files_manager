import { promisify } from 'util';
import redis from 'redis';
import { createClient } from "redis";

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.isClientConnected = true;
    this.client.on("error", (err) => {
      console.log('Redis client failed to connect:', err.toString() || err.message);
      this.isClientConnected = false;
    });
    this.client.on("connect", () => {
      console.log('Redis client connected');
      this.isClientConnected = true;
    });
  }

  isAlive() {
    return this.isClientConnected;
  }

  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  async set(key, value, time) {
    return promisify(this.client.SETTEX)
      .bind(this.client)(key, time, value);
  }

  async del(key) {
    return promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;