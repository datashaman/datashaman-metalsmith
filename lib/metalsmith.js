const debug = require('debug')('app.metalsmith')
const Metalsmith = require('metalsmith')
const path = require('path')

const filters = require('./filters')

module.exports = Metalsmith(path.resolve(__dirname, '..'))
  .metadata(require('./metadata'))
  .use(
    require('metalsmith-sass')({
      outputStyle: 'expanded',
    })
  )
  .use(require('metalsmith-date-in-filename')())
  .use(
    require('metalsmith-collections')({
      posts: 'posts/**/*.md',
    })
  )
  .use(require('metalsmith-drafts')())
  .use(require('metalsmith-markdown')())
  .use(require('./plugins/more')())
  .use(
    require('metalsmith-permalinks')({
      linksets: [
        {
          match: {collection: 'posts'},
          pattern: ':date/:name',
        },
      ],
      pattern: ':name',
    })
  )
  .use(
    require('metalsmith-layouts')({
      engine: 'nunjucks',
      engineOptions: {
        filters: require('./filters'),
        globals: {
          getContext: function() {
            return this.ctx
          },
        },
        noCache: process.env.NODE_ENV === 'development',
        // throwOnUndefined: true,
      },
      suppressNoFilesError: true,
    })
  )
  .use(require('./plugins/webpack')(require('../webpack.config')))
