require('./bootstrap')

const debug = require('debug')('app.watch')
const metalsmith = require('./lib/metalsmith')
const built = require('./lib/utils').built

metalsmith.use(require('metalsmith-serve')()).build(built(debug))
