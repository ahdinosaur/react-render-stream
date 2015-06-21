var test = require('tape')
var through = require('through2')
var React = require('react')
var r = require('r-dom')
var document = require('global/document')

var reactRenderStream = require('./')

test('renders a stream', function (t) {
  var input = through.obj()

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
  .pipe(through.obj(function (chunk, enc, cb) {
    var text = el.querySelector('span').textContent
    t.equal(text, 'hi Mikey')
  }))

  input.write({
    name: 'Mikey'
  })
})
