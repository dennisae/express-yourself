module.exports = {
  plugins: [
    require(`stylelint`),
    require(`postcss-reporter`)({clearMessages: true}), // prettier stylelint reporting
    require(`postcss-cssnext`),
    require(`postcss-will-change`),
    require(`postcss-nested`),
    require(`postcss-simple-vars`)({silent: true})
  ]
};
