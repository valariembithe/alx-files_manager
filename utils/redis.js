import { promisify } from '';
import { RedisClient } from "redis";

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
  };

  async get
}