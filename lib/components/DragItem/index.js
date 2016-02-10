'use strict';

var React = require('react');
var touches = require('touches');

class DragItem extends React.Component {

  constructor(props) {
    super(props);

    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);

    this.state = {
      position: [0, 0],
      offset: [0, 0]
    };
  }

  getTruePosition(pos, off) {
    return pos.map(function(value, i) {
      return value + off[ i ];
    });
  }

  handleStart(ev, pos) {

    var offset = [
      -ev.layerX,
      -ev.layerY
    ];

    this.setState({
      position: pos,
      offset: offset
    });

    this.touches.on('move', this.handleMove);

    this.props.onStart(this.getTruePosition(pos, offset));
  }

  handleMove(ev, pos) {
    this.setState({
      position: pos
    });

    this.props.onMove(this.getTruePosition(pos, this.state.offset));
  }

  handleEnd(ev, pos) {
    this.setState({
      position: pos
    });

    this.touches.removeListener('move', this.handleMove);

    this.props.onEnd(this.getTruePosition(pos, this.state.offset));
  }

  componentWillMount() {
    this.updateFromProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateFromProps(props);
  }

  componentDidMount() {
    this.setupTouches(this.props.parentDOMNode);
  }

  componentWillUnMount() {

  }

  updateFromProps(props) {
    var state = Object.assign(
      {},
      this.state
    );

    if(props.position) {
      state.position = props.position.map(function(value, i) {
        return value - state.offset[ i ];
      });
    }
      
    this.setState(state);
  }

  setupTouches(parentDOMNode) {
    this.touches = touches(parentDOMNode || window)
    .on('start', this.handleStart)
    .on('end', this.handleEnd);
  }

  render() {
    var state = this.state;
    var pos = this.getTruePosition(state.position, state.offset);

    return <div
      style={{
        position: 'absolute',
        left: pos[ 0 ],
        top: pos[ 1 ]
      }}
    >
      { this.props.children }
    </div>
  }
}

DragItem.defaultProps = {
  onStart: function() {},
  onMove: function() {},
  onEnd: function() {}
};

module.exports = DragItem;