const debug = require('debug')('metalsmith')
const Metalsmith = require('metalsmith')
const path = require('path')

module.exports = Metalsmith(path.resolve(__dirname, '..'))
  .metadata(require('./metadata'))
  .use(
    require('metalsmith-sass')({
      outputStyle: 'expanded',
    })
  )
  .use(require('metalsmith-drafts')())
  .use(
    require('metalsmith-collections')({
      posts: 'posts/**/*.md',
    })
  )
  .use(require('metalsmith-markdown')())
  .use(require('./plugins/more')())
  .use(
    require('metalsmith-permalinks')({
      date: 'YYYY/MM/DD',
      linksets: [
        {
          match: {collection: 'posts'},
          pattern: ':title',
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
