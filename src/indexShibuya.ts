import {config} from "dotenv";

// Shibuya
const network = process.env.NETWORK || "shibuya";
config({
    path: `.env.${network}`
});


export * from "./index";
