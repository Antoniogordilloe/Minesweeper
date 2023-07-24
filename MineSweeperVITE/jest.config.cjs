module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(t|m?j)sx?$': '@swc/jest'
    },
    moduleNameMapper: {
      uuid: require.resolve('uuid'),
     '\\.(css|less|png|jpg|gif|jpeg|webp)$': require.resolve('identity-obj-proxy') // Afegim aquesta línia
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.yarn/'],
    moduleFileExtensions: ['js', 'mjs', 'jsx'],
    collectCoverage: true,
    coveragePathIgnorePatterns: [
      'src/__tests__/',
      'node_modules/',
      '.yarn/'
    ]
  }