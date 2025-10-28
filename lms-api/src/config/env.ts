import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().int().positive(),
    DB_URL: z.string(),
    USER_JWT_SECRET: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_REGION: z.string(),
    AWS_BUCKET: z.string(),
});

// const env = envSchema.parse(process.env);

// export default env;
function validateEnv() {
    try {
        // Validate and parse environment variables
        const env = envSchema.parse(process.env);

        // Export the validated environment variables
        return env;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("❌ Environment validation failed:");
            error.errors.forEach((err) => {
                console.error(`- ${err.path.join(".")}: ${err.message}`);
            });
            process.exit(1);
        }
        throw error;
    }
}

export default validateEnv();
