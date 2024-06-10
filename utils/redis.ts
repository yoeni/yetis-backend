import * as redis from "redis";
import MessageHandler from './general/messageHandler';
import config from '../config'

class RedisSerivce extends MessageHandler {
    private static instance: RedisSerivce;
    private client;

    public static getInstance(): RedisSerivce {
        if (!RedisSerivce.instance) {
            RedisSerivce.instance = new RedisSerivce();
        }

        return RedisSerivce.instance;
    }

    constructor() {
        super();
        this.client = redis.createClient({
            url: `redis://${config.REDIS_HOSTNAME}`
        });

        this.client.on('connect', () => {   
            console.log("connected");
        });  
        this.client.on("error", (error) =>{
            console.error(error);
        });
        this.client.connect();
    }
    getCache = async (field) => {
        const cacheData = JSON.parse(await this.client.get(field));
        if (cacheData)
            return this.RequestControllerMessage(true, cacheData);
        else 
            return this.RequestControllerMessage(false);
    }
    setCache = async (field, value) => {
        await this.client.set(field, JSON.stringify(value));
    }
    deleteCache = async (field) => {
        console.log(field);
        await this.client.del(field);
    }
    deleteAllCache = async () => {
        try {
            await this.client.flushAll();
            return this.RequestControllerMessage(true, 'all cache is cleared');
        } catch {
            return this.RequestControllerMessage(true, 'error occured when delete all caches');
        }
    }

}
export default RedisSerivce;