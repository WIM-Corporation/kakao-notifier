/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],

  setupFilesAfterEnv: ['<rootDir>/libs/test-util/src/set-up.ts'],


  moduleNameMapper: {
    '@api$': '<rootDir>/apps/api/src',
    '@api/modules$': '<rootDir>/apps/api/src/modules',
    '@api/modules/(.*)$': '<rootDir>/apps/api/src/modules/$1',
    '@batch$': '<rootDir>/apps/api/src',
    '@batch/modules$': '<rootDir>/apps/batch/src/modules',
    '@batch/modules/(.*)$': '<rootDir>/apps/batch/src/modules/$1',
    '@processor$': '<rootDir>/apps/processor/src',
    '@processor/modules$': '<rootDir>/apps/processor/src/modules',
    '@processor/modules/(.*)$': '<rootDir>/apps/processor/src/modules/$1',
    '@libs/type$': '<rootDir>/libs/type/src',
    '@libs/type/(.*)$': '<rootDir>/libs/type/src/$1',
    '@libs/meta$': '<rootDir>/libs/meta/src',
    '@libs/meta/(.*)$': '<rootDir>/libs/meta/src/$1',
    '@libs/decorator$': '<rootDir>/libs/decorator/src',
    '@libs/decorator/(.*)$': '<rootDir>/libs/decorator/src/$1',
    '@libs/base$': '<rootDir>/libs/base/src',
    '@libs/base/(.*)$': '<rootDir>/libs/base/src/$1',
    '@libs/constant$': '<rootDir>/libs/constant/src',
    '@libs/constant/(.*)$': '<rootDir>/libs/constant/src/$1',
    '@libs/config$': '<rootDir>/libs/config/src',
    '@libs/config/(.*)$': '<rootDir>/libs/config/src/$1',
    '@libs/interceptor$': '<rootDir>/libs/interceptor/src',
    '@libs/interceptor/(.*)$': '<rootDir>/libs/interceptor/src/$1',
    '@libs/util$': '<rootDir>/libs/util/src',
    '@libs/util/(.*)$': '<rootDir>/libs/util/src/$1',
    '@libs/exception$': '<rootDir>/libs/exception/src',
    '@libs/exception/(.*)$': '<rootDir>/libs/exception/src/$1',
    '@libs/middleware$': '<rootDir>/libs/middleware/src',
    '@libs/middleware/(.*)$': '<rootDir>/libs/middleware/src/$1',
    '@libs/filter$': '<rootDir>/libs/filter/src',
    '@libs/filter/(.*)$': '<rootDir>/libs/filter/src/$1',
    '@libs/guard$': '<rootDir>/libs/guard/src',
    '@libs/guard/(.*)$': '<rootDir>/libs/guard/src/$1',
    '@libs/transformer$': '<rootDir>/libs/transformer/src',
    '@libs/transformer/(.*)$': '<rootDir>/libs/transformer/src/$1',
    '@libs/modules$': '<rootDir>/libs/modules/src',
    '@libs/modules/(.*)$': '<rootDir>/libs/modules/src/$1',
  },

  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-node',

  // The glob patterns Jest uses to detect test files
  testMatch: ['<rootDir>/**/*.test.(ts)', '<rootDir>/batch/**/src/**/*.spec.ts', '<rootDir>/apps/**/src/**/*.spec.ts', '<rootDir>/libs/**/src/**/*.spec.ts'],

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['<rootDir>/node_modules/'],


};
