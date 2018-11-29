import React, { PureComponent } from "react";
import { Circle } from "react-konva";
import { connect } from 'react-redux';

class Ball extends PureComponent {
  render() {
    const { ballX, ballY } = this.props.coordinates;

    return (
      <Circle
        ref="ball"
        x={ballX}
        y={ballY}
        radius={6}
        fill='#fff'
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  coordinates: state.games && state.games[props.gameId].coordinates,
})

export default connect(mapStateToProps)(Ball)