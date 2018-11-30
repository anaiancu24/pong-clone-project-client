import React, { PureComponent } from "react";
import { Group, Rect } from "react-konva";

export const WIDTH = 1100;
export const HEIGHT = 800;

export default class Court extends PureComponent {
  render() {
    return (
      <Group>
        <Rect
          x={0}
          y={0}
          width={WIDTH}
          height={HEIGHT}
          fill="#333"
          shadowBlur={2}
        />
      </Group>
    );
  }
}