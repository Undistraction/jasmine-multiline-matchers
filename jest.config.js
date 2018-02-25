module.exports = {
  bail: true,
  verbose: true,
  collectCoverage: false,
  collectCoverageFrom: [`src/**/*.js`],
  coveragePathIgnorePatterns: [
    `src/index.js`,
    `src/utils.js`,
    `src/jasmine_utils.js`,
  ],
  coverageReporters: [`lcov`, `html`],
  setupFiles: [],
  modulePathIgnorePatterns: [`testHelpers/`],
  setupTestFrameworkScriptFile: `<rootDir>/src/__tests__/testHelpers/customMatchers.js`,
}
