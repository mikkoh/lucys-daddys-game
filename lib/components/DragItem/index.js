'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var touches = require('touches');

class DragItem extends React.Component {

  constructor(props) {
    super(props);

    this.handleTouch = this.handleTouch.bind(this);
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
    var el = ReactDom.findDOMNode(this);
    var offset = [
      el.offsetLeft - pos[ 0 ],
      el.offsetTop - pos[ 1 ]
    ];

    this.setState({
      position: pos,
      offset: offset
    });

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

    this.touches.disable();

    this.props.onEnd(this.getTruePosition(pos, this.state.offset));
  }

  componentWillMount() {
    this.updateFromProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateFromProps(props);
  }

  componentDidMount() {
    this.touches = touches(this.props.parentDOMNode || window)
    .on('start', this.handleStart)
    .on('move', this.handleMove)
    .on('end', this.handleEnd);

    this.touches.disable();
  }

  componentWillUnMount() {
    this.touches.disable();
  }

  handleTouch() {
    this.touches.enable();
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

  render() {
    var state = this.state;
    var pos = this.getTruePosition(state.position, state.offset);

    return <div
      style={{
        position: 'absolute',
        left: pos[ 0 ],
        top: pos[ 1 ]
      }}
      onMouseDown={this.handleTouch}
      onTouchStart={this.handleTouch}
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