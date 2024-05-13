import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Represents a Redis client.
 */
class RedisClient {
  /**
   * Creates a new RedisClient instance.
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });const redis = require('redis');

    class RedisClient {
      constructor() {
        this.client = redis.createClient();
    
        this.client.on('error', (error) => {
          console.error('Redis Error:', error);
        });
      }
    
      isAlive() {
        return this.client.connected;
      }
    
      async get(key) {
        return new Promise((resolve, reject) => {
          this.client.get(key, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
          });
        });
      }
    
      async set(key, value, duration) {
        return new Promise((resolve, reject) => {
          this.client.set(key, value, 'EX', duration, (error, result) => {
      if (error) {
              reject(error);
      } else {
        resolve(result);
      }
          });
        });
      }
    
      async del(key) {
        return new Promise((resolve, reject) => {
          this.client.del(key, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
          });
        });
      }
    }
    
    const redisClient = new RedisClient();
    module.exports = redisClient;
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Checks if this client's connection to the Redis server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Retrieves the value of a given key.
   * @param {String} key The key of the item to retrieve.
   * @returns {String | Object}
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Stores a key and its value along with an expiration time.
   * @param {String} key The key of the item to store.
   * @param {String | Number | Boolean} value The item to store.
   * @param {Number} duration The expiration time of the item in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  /**
   * Removes the value of a given key.
   * @param {String} key The key of the item to remove.
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;