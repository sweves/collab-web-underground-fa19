module.exports = {
  ident: 'postcss',
  plugins: [
    require('postcss-preset-env')({
      browsers: 'Chrome > 52',
      stage: 4
    })
  ]
}
