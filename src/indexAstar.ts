import dotenv from "dotenv";

// Astar
const network = process.env.NETWORK || "astar";
dotenv.config({
    path: `.env.${network}`
});

export * from "./index";
