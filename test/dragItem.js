var React = require('react');
var ReactDom = require('react-dom');
var DragItem = require('../lib/components/DragItem');

ReactDom.render(
  <DragItem
    position={[ 100, 100 ]}
    onStart={handleTouch.bind(null, 'start')}
    onMove={handleTouch.bind(null, 'move')}
    onEnd={handleTouch.bind(null, 'end')}
  >
    <div 
      style={{
        width: 100,
        height: 100,
        backgroundColor: '#CAFE00'
      }}
    />
  </DragItem>,
  document.body.appendChild(document.createElement('div'))
);

function handleTouch(type, pos) {
  console.log(type, pos);
}