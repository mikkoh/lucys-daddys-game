var React = require('react');
var ReactDom = require('react-dom');
var DragItem = require('../lib/components/DragItem');

document.body.style.backgroundColor = '#f2f6ed';

ReactDom.render(
  <div>
    {
      [
        getDragItem('mom.png', 383, 41),
        getDragItem('dad.png', 685, 45),
        getDragItem('baby.png', 135, 148)
      ]
    }
  </div>,
  document.body.appendChild(document.createElement('div'))
);

function getDragItem(url, x, y) {
  this.key = this.key || 0;
  this.key++;

  return <DragItem
      key={this.key}
      position={[ x || 0, y || 0 ]}
      onStart={handleTouch.bind(null, 'start')}
      onMove={handleTouch.bind(null, 'move')}
      onEnd={handleTouch.bind(null, 'end')}
    >
      <img 
        src={url}
        draggable={false}
      />
    </DragItem>;
}

function handleTouch(type, pos) {
  console.log(type, pos);
}