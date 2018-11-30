import React, { Component } from "react";
import { Layer, Text } from "react-konva";
import Court from "./PongCourt";
import Ball from "./PongBall";
import Paddles from "./Paddle";
import { WIDTH } from "./PongCourt";
import { connect } from 'react-redux'

class Game extends Component {
  render() {
    return (
      <Layer>
        <Court />
        <Ball gameId={this.props.gameId} />
        <Paddles gameId={this.props.gameId} />
        <Text
          x={WIDTH / 2}
          y={20}
          text={`${this.props.score1} : ${this.props.score2}`}
          fontSize={50}
          fontFamily="Calibri"
          fill="white"
        />
      </Layer>
    );
  }
}

const mapStateToProps = (state, props) => ({
  score1: state.games && state.games[props.gameId].players[0].score,
  score2: state.games && state.games[props.gameId].players[1].score,
})

export default connect(mapStateToProps)(Game)