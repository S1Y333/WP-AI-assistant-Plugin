module.exports = {
  presets: [
    ['@babel/preset-env', { targets: "defaults" }],
    ['@babel/preset-react', { runtime: 'automatic' }], // enables `jsxs`
    '@babel/preset-typescript'
  ],
};

