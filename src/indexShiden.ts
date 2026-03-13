import {config} from "dotenv";

// Shiden
const network = process.env.NETWORK || "shiden";
config({
    path: `.env.${network}`
});

export * from "./index";

