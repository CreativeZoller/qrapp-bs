const {defaults} = require('jest-config');

module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.ts'
  ],
  moduleNameMapper: {
    '^lodash-es$': 'lodash'
  },
  testMatch: [
    '<rootDir>/src/**/*.spec.ts',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.ts',
    '!**/node_modules/**',
    '!**/src/**/*.module.ts',
    '!test/**',
    '!**/e2e/**',
    '!**/polyfills.ts',
    '!**/environments/**',
    '!**/src/setupJest.ts',
    '!**/src/main.ts'
  ]
};

