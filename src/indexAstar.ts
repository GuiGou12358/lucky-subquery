import {config} from "dotenv";

// Astar
const network = process.env.NETWORK || "astar";
config({
    path: `.env.${network}`
});

export * from "./index";
