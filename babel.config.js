module.exports = {
  presets: ['@babel/preset-typescript'],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }
  }
}
