module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',

  moduleNameMapper: {
    '^@posts/(.*)$': '<rootDir>/src/posts/$1',
    '^@users/(.*)$': '<rootDir>/src/users/$1',
  },
};
