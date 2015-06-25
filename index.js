var inherits = require('inherits')
var Writable = require('readable-stream').Writable
var React = require('react')

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
  React.render(
    this.Factory(props),
    this.element,
    cb
  )
}
