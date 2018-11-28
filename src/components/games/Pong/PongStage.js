import React, { Component } from "react";
import Game from "./PongGame";
import { Stage } from "react-konva";

const width = 1100
const height = 800

export default class App extends Component {
  render() {
    return (
      <Stage
        className="Pong"
        width={width}
        height={height}
      >
        <Game />
      </Stage>
    );
  }
}