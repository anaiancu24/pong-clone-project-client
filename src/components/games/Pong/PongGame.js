import React, { Component } from "react";
import { Layer, Circle, Rect } from "react-konva";
import Court from "./PongCourt";
import Ball from "./PongBall";
import Paddles from "./Paddle";

export default class Game extends Component {
  render() {
    return (
      <Layer>
        <Court />
        <Ball gameId={this.props.gameId}/>
        <Paddles gameId={this.props.gameId}/>
      </Layer>
    );
  }
}