import dotenv from "dotenv";

// Shiden
const network = process.env.NETWORK || "shiden";
dotenv.config({
    path: `.env.${network}`
});

export * from "./index";

