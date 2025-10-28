import { Queue } from "bullmq";
import redis from "./redis";

const defaultJobOptions = {
  removeOnComplete: {
    age: 24 * 60 * 60, //  Remove jobs older than 24 hours
    count: 1000, //  (Optional) Keep up to 1000 jobs
  },
  removeOnFail: {
    age: 48 * 60 * 60, //  Remove failed jobs older than 48 hours
    count: 500, //  (Optional) Keep up to 500 failed jobs
  },
};
export const sendOtpQueue = new Queue("send-otp", {
  connection: redis,
  defaultJobOptions,
});
