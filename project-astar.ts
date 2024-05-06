import {SubstrateDatasourceKind, SubstrateHandlerKind, SubstrateProject,} from "@subql/types";

import {WasmDatasource} from "@subql/substrate-wasm-processor";

// Can expand the Datasource processor types via the generic param
const projectAstar: SubstrateProject<WasmDatasource> = {
    specVersion: "1.0.0",
    version: "2.0.0",
    name: "lucky-subql",
    description:
        "This SubQuery project indexes data used by the dApp Lucky on Astar network",
    runner: {
        node: {
            name: "@subql/node",
            version: ">=3.0.1",
        },
        query: {
            name: "@subql/query",
            version: "*",
        },
    },
    schema: {
        file: "./schema.graphql",
    },
    network: {
        chainId:
            "0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6",
        endpoint: ["wss://rpc.astar.network", "wss://astar-rpc.dwellir.com"],
    },
    dataSources: [
        {
            // This is the datasource for dAppStakingV3 events
            kind: SubstrateDatasourceKind.Runtime,
            startBlock: 5445000,
            mapping: {
                file: "./dist/indexAstar.js",
                handlers: [
                    {
                        kind: SubstrateHandlerKind.Event,
                        handler: "handleStake",
                        filter: {
                            module: "dappStaking",
                            method: "Stake",
                        },
                    },
                    {
                        kind: SubstrateHandlerKind.Event,
                        handler: "handleUnstake",
                        filter: {
                            module: "dappStaking",
                            method: "Unstake",
                        },
                    },
                    {
                        kind: SubstrateHandlerKind.Event,
                        handler: "handleDAppReward",
                        filter: {
                            module: "dappStaking",
                            method: "DAppReward",
                        },
                    },
                    {
                        kind: SubstrateHandlerKind.Event,
                        handler: "handleNewEra",
                        filter: {
                            module: "dappStaking",
                            method: "NewEra",
                        },
                    },
                    {
                        kind: SubstrateHandlerKind.Event,
                        handler: "handleNewSubPeriod",
                        filter: {
                            module: "dappStaking",
                            method: "NewSubperiod",
                        },
                    },
                ],
            },
        },
        {
            kind: "substrate/Wasm",
            startBlock: 6111890,
            //endBlock: 1,
            processor: {
                file: "./node_modules/@subql/substrate-wasm-processor/dist/bundle.js",
                options: {
                    abi: "luckyRaffle",
                    //old contract before 2024-05-06: "XPC4BUeSHhTWqzUdUWtW1cTNHhktNPgenKZ4qq2FkKR2two",
                    contract: "W8aL4naa9CarCYxpepfm3BQS5SqMnJXfe2pPQZ3Kiie6k82",
                },
            },
            assets: new Map([["luckyRaffle", {file: "./metadata_astar/lucky_raffle_metadata.json"}]]),
            mapping: {
                file: "./dist/indexAstar.js",
                handlers: [
                    {
                        handler: "handleRaffleDone",
                        kind: "substrate/WasmEvent",
                        filter: {
                            identifier: "RaffleDone"
                        }
                    },
                    {
                        handler: "handleRaffleSkipped",
                        kind: "substrate/WasmEvent",
                        filter: {
                            identifier: "RaffleSkipped"
                        }
                    }
                ]
            }
        },
        {
            kind: "substrate/Wasm",
            startBlock: 4668050,
            //endBlock: 1,
            processor: {
                file: "./node_modules/@subql/substrate-wasm-processor/dist/bundle.js",
                options: {
                    abi: "rewardManager",
                    contract: "ZSV1GVepvmWFdshMWgczS4zYvmmwEsBjWQjN4WDpUEFRRPy",
                },
            },
            assets: new Map([["rewardManager", {file: "./metadata_astar/reward_manager_metadata.json"}]]),
            mapping: {
                file: "./dist/indexAstar.js",
                handlers: [
                    {
                        handler: "handlePendingReward",
                        kind: "substrate/WasmEvent",
                        filter: {
                            identifier: "PendingReward"
                        }
                    },
                    {
                        handler: "handleRewardsClaimed",
                        kind: "substrate/WasmEvent",
                        filter: {
                            identifier: "RewardsClaimed"
                        }
                    }
                ]
            }
        },
    ],
};

// Must set default to the project instance
export default projectAstar;
