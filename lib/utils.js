module.exports = {
  built: debug => {
    return (err, files) => {
      if (err) throw err

      Object.keys(files).forEach(path => {
        debug('Generated %o', path)
      })
    }
  },
}
