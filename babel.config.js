module.exports = function(api) {
  // Ignore babel config for Cypress runner
  // workaround from https://github.com/cypress-io/cypress/issues/2945
  if (api.cache.using(() => process.env.CYPRESS_INTERNAL_ENV)) {
    return {};
  }
  // ---

  api.cache(true);

  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      'react-hot-loader/babel',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-function-bind',
      '@babel/plugin-proposal-async-generator-functions',
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-proposal-export-default-from',
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3,
          absoluteRuntime: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
        },
      ],
      'babel-plugin-styled-components',
    ],
    env: {
      test: {
        plugins: ['require-context-hook'],
      },
    },
  };
};
