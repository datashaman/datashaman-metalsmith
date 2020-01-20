const Autolinker = require('autolinker')
const emoji = require('node-emoji')

module.exports = {
  autolink: Autolinker.link,
  emojify: emoji.emojify,
}
