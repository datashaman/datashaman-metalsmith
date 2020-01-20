const debug = require('debug')('plugins.more')

const defaults = {
  pattern: /\s*<!--\s*more\s*-->/i,
}

module.exports = options => {
  options = options || {}
  options = {...defaults, ...options}

  return (files, metalsmith, done) => {
    Object.keys(files).forEach(path => {
      const contents = files[path].contents
      const string = contents.toString()
      const index = string.search(options.pattern)

      if (index !== -1) {
        files[path].summary = contents
          .slice(0, Buffer.byteLength(string.slice(0, index)))
          .toString()
          .trim()
        debug('Found summary for %o: %o', path, files[path].summary.toString())
      }
    })

    done()
  }
}
