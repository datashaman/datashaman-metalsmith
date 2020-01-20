require('dotenv').config()

const Metalsmith = require('metalsmith')
const path = require('path')

process.on('uncaughtException', err => {
  console.error(err.message)
  process.exit(-1)
})

const metalsmith = Metalsmith(__dirname, '..')
  .metadata(require('./lib/metadata.json'))
  .use(
    require('metalsmith-sass')({
      outputStyle: 'expanded',
    })
  )
  .use(require('metalsmith-drafts')())
  .use(require('metalsmith-markdown')())
  .use(require('metalsmith-permalinks')(':name'))
  .use(
    require('metalsmith-layouts')({
      engine: 'nunjucks',
      engineOptions: {
        filters: require('./lib/filters'),
      },
    })
  )
  .use(
    require('metalsmith-watch')({
      livereload: true,
      paths: {
        '${source}/**/*': true,
        'layouts/**/*': true,
        'lib/**/*': true,
        'scripts/**/*': true,
      },
    })
  )
  .build((err, files) => {
    if (err) throw err
    console.log(`Built: \n${Object.keys(files).join('\n')}`)
  })
