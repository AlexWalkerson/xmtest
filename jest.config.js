/** @type {import('jest').Config} */
const config = {
  "verbose": true,
  "preset": "jest-preset-angular",
  "setupFilesAfterEnv": ["<rootDir>/setup-jest.ts"],
  "moduleNameMapper": {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};

module.exports = config;
