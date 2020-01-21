const debug = require('debug')('app.plugins.webpack')
const webpack = require('webpack')

module.exports = options => {
  options = options || {}

  return (files, metalsmith, done) => {
    webpack(options, (err, stats) => {
      if (err || stats.hasErrors()) throw err

      Object.keys(stats.compilation.assets).forEach(path => {
        const asset = stats.compilation.assets[path]

        debug('Generated %o', path)

        files[path] = {
          contents: asset.source(),
          mode: '0644',
        }
      })

      done()
    })
  }
}
