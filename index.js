var inherits = require('inherits')
var Writable = require('readable-stream').Writable
var React = require('react')
var raf = require('raf')

module.exports = ReactRenderStream

inherits(ReactRenderStream, Writable)
function ReactRenderStream (opts) {
  if (!(this instanceof ReactRenderStream)) {
    return new ReactRenderStream(opts)
  }

  Writable.call(this, {
    objectMode: true
  })

  this.Component = opts.Component
  this.Factory = React.createFactory(this.Component)
  this.element = opts.element
}

ReactRenderStream.prototype._write = write

function write (props, enc, cb) {
  var Factory = this.Factory
  var element = this.element

  raf(function () {
    React.render(
      Factory(props),
      element,
      cb
    )
  })
}
