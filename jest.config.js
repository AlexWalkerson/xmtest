/** @type {import('jest').Config} */
const config = {
  verbose: true,
  "preset": "jest-preset-angular",
  "setupFilesAfterEnv": ["<rootDir>/setup-jest.ts"]
};

module.exports = config;
