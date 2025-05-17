module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Handle any specific file patterns or configurations
  transform: {
    "^.+\\.tsx?$": ["ts-jest"],
  },
};
