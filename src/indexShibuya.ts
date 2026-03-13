import dotenv from "dotenv";

// Shibuya
const network = process.env.NETWORK || "shibuya";
dotenv.config({
    path: `.env.${network}`
});


export * from "./index";
