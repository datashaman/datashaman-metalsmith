require('./bootstrap')

const debug = require('debug')('app.build')
const metalsmith = require('./lib/metalsmith')
const built = require('./lib/utils').built

metalsmith.build(built(debug))
