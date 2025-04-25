import { coerce, number, object, string } from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

const envSchema = object({
    PORT: coerce.number().int().default(3001),
    dbURL: coerce.string(),
    SALT_ROUNDS: coerce.number().int().min(10).max(15).default(12),
    PUBLIC_KEY: coerce.string(),
    PRIVATE_KEY:coerce.string(),
    TOKENLIFETIME: coerce.number() 
})

const env = envSchema.parse(process.env);

export default env;