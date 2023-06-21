import { config } from "dotenv";
import process from "process";

config();

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
    PORT,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_DATABASE,
    SECRET_KEY,
    LOG_FORMAT,
    LOG_DIR,
    ORIGIN,
    ALCHEMY_KEY,
    FAUCET_MANAGER_PK,
    FAUCET_CONTRACT_ADDRESS,
    IRO_CONTRACT_ADDRESS,
    IRO_CREATION_BLOCK,
    RENFT_CONTRACT_ADDRESS,
    RENFT_CREATION_BLOCK
} = process.env;
