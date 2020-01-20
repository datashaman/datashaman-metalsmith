require('dotenv').config()

process.on('uncaughtException', err => {
  console.error(err)
  process.exit(-1)
})
