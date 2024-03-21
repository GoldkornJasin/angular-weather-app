module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/src/"],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  moduleNameMapper: {
    "^@services/(.*)$": "<rootDir>/src/app/services/$1",
    "^@pipes/(.*)$": "<rootDir>/src/app/pipes/$1",
    "^@pages/(.*)$": "<rootDir>/src/app/pages/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@components/(.*)$": "<rootDir>/src/app/components/$1",
  },
};
