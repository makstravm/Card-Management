import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  verbose: true,
  automock: false,
  modulePaths: ["./src"],
  moduleFileExtensions: ["tsx", "ts", "js", "jsx", "json"],
  setupFilesAfterEnv: ["./src/setUpTests.ts"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};

export default config;
