var through = require('through2')
var React = require('react')
var r = require('r-dom')

module.exports = reactRenderStream

function reactRenderStream (opts) {
  var Factory = React.createFactory(opts.Component)
  var element = opts.element

  return through.obj(function (props, enc, cb) {
    React.render(
      Factory(props),
      element
    )
    cb(null, props)
  })
}
