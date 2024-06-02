import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globalSetup: "./tests/jestGlobalSetup.ts",
  globalTeardown: "./tests/jestGlobalTeardown.ts",
  setupFiles: ["./tests/setupTests.ts"],
  modulePathIgnorePatterns: ["node_modules", "dist", "build"]
};
export default config;