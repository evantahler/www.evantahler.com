module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/setup.jest.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: ["next/babel"],
      },
    ],
  },
};
