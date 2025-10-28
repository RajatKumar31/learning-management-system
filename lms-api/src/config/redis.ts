import IORedis from "ioredis";

const redis = new IORedis({ maxRetriesPerRequest: null }); // Default port is 6379

export default redis;
