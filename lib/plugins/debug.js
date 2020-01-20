module.exports = () => (files, metalsmith, done) => {
  console.log('DEBUG', files, metalsmith, metalsmith.metadata())
  done()
}
