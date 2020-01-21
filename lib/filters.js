const Autolinker = require('autolinker')
const emoji = require('node-emoji')
const moment = require('moment')

module.exports = {
  autolink: value => Autolinker.link(value),
  emojify: value => emoji.emojify(value),
  moment: (value, format) => moment(value).format(format),
  typeOf: value =>
    Object.prototype.toString
      .call(value)
      .replace(/^\[object (.+)\]$/, '$1')
      .toLowerCase(),
}
