import { Worker } from "bullmq";
import redis from "../config/redis";

const otpWorker = new Worker(
    "send-otp",
    async (job) => {
        console.log("jobName: ", job.name);
        const { phoneNumber, otp } = job.data;
        console.log("phoneNumber :", phoneNumber, " otp :", otp);
        // call otp service here
    },
    {
        connection: redis,
    },
);

otpWorker.on("completed", (job) => {
    console.log(`${job.id} completed`);
});

otpWorker.on("failed", (job, err) => {
    // TODO: log error
    console.log(`${job?.id} failed ${err.message}`);
});
