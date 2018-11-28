import React, { PureComponent } from "react";
import { connect } from 'react-redux'
import { Group, Rect } from "react-konva";
import { userId } from '../../../jwt';
import { updatePaddlePosition } from "../../../actions/games";

const WIDTH = 1100;
const paddleWidth = 100;

class Paddles extends PureComponent {
  componentDidMount() {
    window.addEventListener('keypress', (e) => {
      this.props.updatePaddlePosition(this.paddleControl(e));
    })
  }

  paddleControl = (event) => {
    console.log("hey i am being fired")
    const paddleSpeed = 10
    const player = this.props.game.players.find(p => p.userId === this.props.userId)
    const paddle1Y = this.props.coordinates.paddle1Y
    const paddle2Y = this.props.coordinates.paddle2Y

    if (player.symbol === '1') {
      if (event.key == 'w' && (paddle1Y + 100) < 1100) {
        console.log('w pressed 1')
        return {
          type: 'UPDATE_PADDLE_1',
          position: paddle1Y - paddleSpeed,
          id: this.props.game.id
        }
      } else if (event.key === 's' && paddle1Y > 0) {
        console.log('s pressed 1')
        return {
          type: 'UPDATE_PADDLE_1',
          position: paddle1Y + paddleSpeed,
          id: this.props.game.id
        }
      }
    } else if (player.symbol === '2') {
      if (event.key === 'w' && (paddle2Y + 100) < 1100) {
        console.log('w pressed 2')
        return {
          type: 'UPDATE_PADDLE_2',
          position: paddle2Y - paddleSpeed,
          id: this.props.game.id
        }
      } else if (event.key === 's' && paddle2Y > 0) {
        console.log('s pressed 2')
        return {
          type: 'UPDATE_PADDLE_2',
          position: paddle2Y + paddleSpeed,
          id: this.props.game.id
        }
      }
    }
  }

  render() {
    const { paddle1Y, paddle2Y } = this.props.coordinates
    return (
      <Group>
        <Rect
          x={WIDTH - 20}
          y={paddle2Y}
          width={10}
          height={paddleWidth}
          fill="#fff"
        />
        <Rect
          x={10}
          y={paddle1Y}
          width={10}
          height={paddleWidth}
          fill="#fff"
        />
      </Group>
    );
  }
}

const mapStateToProps = (state, props) => ({
  coordinates: state.games && state.games[props.gameId].coordinates,
  game: state.games && state.games[props.gameId],
  userId: state.currentUser && userId(state.currentUser.jwt),
})

export default connect(mapStateToProps, { updatePaddlePosition })(Paddles)