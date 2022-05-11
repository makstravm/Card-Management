import type { Config } from "@jest/types";

// ["./jest.setup.ts"],
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  automock: false,
  setupFilesAfterEnv: ["./src/setUpTests.ts"],
};

export default config;
