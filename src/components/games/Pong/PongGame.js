import React, { Component } from "react";
import { Layer, Circle, Rect } from "react-konva";
import Court from "./PongCourt";
import Ball from "./PongBall";

export default class Game extends Component {
  render() {
    return (
      <Layer>
        <Court />
        <Ball />
      </Layer>
    );
  }
}