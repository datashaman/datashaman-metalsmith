const path = require('path')
const mode = process.env.NODE_ENV || 'development'

module.exports = {
  mode,
  devtool: mode === 'development' ? 'source-maps' : null,
  entry: path.resolve(__dirname, 'scripts/main.js'),
  output: {
    path: path.resolve(__dirname, 'var/webpack'),
    filename: 'scripts/bundle.js',
  },
}
