var test = require('tape')
var React = require('react')
var r = require('r-dom')
var PassThrough = require('readable-stream').PassThrough
var document = require('global/document')

var reactRenderStream = require('./')

test('renders a stream', function (t) {
  var input = new PassThrough({
    objectMode: true
  })

  var el = document.createElement('div')
  document.body.appendChild(el)

  t.plan(1)
  
  input
  .pipe(reactRenderStream({
    Component: React.createClass({
      render: function () {
        return r.span("hi " + this.props.name)
      }
    }),
    element: el
  }))

  input.end({
    name: 'Mikey'
  }, function () {
    var text = el.querySelector('span').textContent
    t.equal(text, 'hi Mikey')
  })
})
