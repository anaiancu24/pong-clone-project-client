import React, { PureComponent } from "react";
import Konva from "konva";
import { Circle } from "react-konva";
import { WIDTH, HEIGHT } from "./PongCourt";
import { connect } from 'react-redux'
import { updateGame } from '../../../actions/games'
import { userId } from '../../../jwt'

const MIN_X = 12,
  MIN_Y = 12,
  MAX_X = WIDTH - MIN_X,
  MAX_Y = HEIGHT - MIN_Y,
  SPEED = 30;

class Ball extends PureComponent {
  state = {
    color: Konva.Util.getRandomColor(),
    x: WIDTH / 2,
    y: HEIGHT / 2,
    direction: { x: 0, y: 0 }
  };

  componentDidMount() {
    const x = 20;
    const y = 0;
    this.setState({ direction: { x, y } });
    this.animate();
  }

  newCoord = (x, deltaX, y, deltaY) => {
    let newX = x + deltaX;
    let newY = y + deltaY;
    let newDeltaX = deltaX;
    let newDeltaY = deltaY;

    if (this.props.game.winner !== "null") {
      return { x: WIDTH / 2, y: HEIGHT / 2, deltaX: 0, deltaY: 0 }
    }

    if (newX > WIDTH || newX < 0) {
      return this.collision(newX, newY, newDeltaX)
    }

    if ((newY > HEIGHT || newY < 0) && (newX !== WIDTH || newX !== 0)) {
      newDeltaY = -deltaY
      return { x: newX, y: newY, deltaX: newDeltaX, deltaY: newDeltaY }
    }

    return { x: newX, y: newY, deltaX: newDeltaX, deltaY: newDeltaY }

  };

  collision = (x, y, deltaX, deltaY) => {
    const paddle1Top = this.props.coordinates.paddle1Y
    const paddle1Bottom = this.props.coordinates.paddle1Y + 100

    const paddle2Top = this.props.coordinates.paddle2Y
    const paddle2Bottom = this.props.coordinates.paddle2Y + 100

    const player = this.props.game.players.find(p => p.userId === this.props.userId)

    let newDeltaX
    let newDeltaY
    let modY

    let result = { x: x, y: y, deltaX: deltaX, deltaY: deltaY }

    if (x > WIDTH / 2 && (y >= paddle2Top && y <= paddle2Bottom)) {
      newDeltaX = -deltaX
      modY = y - (paddle2Top + 100 / 2)
      newDeltaY = modY * 0.35;
      result = { x: x, y: y, deltaX: newDeltaX, deltaY: newDeltaY }
    } else if (x < WIDTH / 2 && (y >= paddle1Top && y <= paddle1Bottom)) {
      newDeltaX = -deltaX
      modY = y - (paddle1Top + 100 / 2)
      newDeltaY = modY * 0.35;
      result = { x: x, y: y, deltaX: newDeltaX, deltaY: newDeltaY }
    } else {

      result = { x: WIDTH / 2, y: HEIGHT / 2, deltaX: -deltaX, deltaY: 0 }

      if (x < WIDTH / 2) {
        const update = {
          type: "SCORE_PLAYER2",
          newScore: this.props.game.players[1].score + 1
        }
        this.props.updateGame(this.props.gameId, update)
      } else {
        const update = {
          type: "SCORE_PLAYER1",
          newScore: this.props.game.players[0].score + 1
        }
        this.props.updateGame(this.props.gameId, update)
      }
    }
    console.log(result)
    return result
  }

  animate = () => {
    const { direction, x, y } = this.state;

    if (direction.x !== 0 || direction.y !== 0) {
      const newC = this.newCoord(x, direction.x, y, direction.y);

      this.setState({
        x: newC.x,
        y: newC.y,
        direction: {
          x: newC.deltaX,
          y: newC.deltaY
        }
      });
    }

    this.animationTimeout = setTimeout(this.animate, 50);
  };

  render() {
    const { color, x, y } = this.state;

    return (
      <Circle
        ref={comp => {
          this.ball = comp;
        }}
        x={x}
        y={y}
        radius={10}
        fill={color}
        shadowBlur={1}
      />
    );
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimeout);
  }
}


const mapStateToProps = (state, props) => ({
  coordinates: state.games && state.games[props.gameId].coordinates,
  game: state.games && state.games[props.gameId],
  userId: state.currentUser && userId(state.currentUser.jwt),
})

export default connect(mapStateToProps, { updateGame })(Ball)









