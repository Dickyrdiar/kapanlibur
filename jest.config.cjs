

module.exports = {
  preset: 'vite-jest',
  testEnvironment: 'node',

  testPathIgnorePatterns: [
    '/node_modules',
  ],

  testMatch: [
    '**/*.test.js'
  ]
}
