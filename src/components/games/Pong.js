import React, { Component } from 'react';
import $ from 'jquery';

const gameWidth = 1100
const gameHeight = 800 // get this from Backend later

let player1Score = 0, // This as well
  player2Score = 0,
  gameOver = false,
  winner = "",
  monkey = false;


export default class Pong extends Component {

  componentDidMount() {
    this.drawInitial();
  }

  drawInitial() {
    const Width = gameWidth,
      Height = gameHeight,
      ctx = this.refs.canvas.getContext('2d'),
      fps = 60,
      paddleWidth = 100;

    let ballY = Height / 2,
      ballX = Width / 2,
      ballRadius = 6,
      ballSpeedY = 0,
      ballSpeedX = Height / 75;

    let paddle1Y = Height / 2 - (paddleWidth / 2),
      paddle2Y = Height / 2 - (paddleWidth / 2),
      paddleSpeed = 6;

    // screen
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, Width, Height);

    // middle dashed line
    ctx.strokeStyle = "#fff";
    ctx.setLineDash([10]);
    ctx.beginPath();
    ctx.moveTo(Width / 2, 0);
    ctx.lineTo(Width / 2, Height);
    ctx.stroke();

    // score
    ctx.font = "30px Orbitron";
    ctx.fillStyle = "#888";
    ctx.fillText(player1Score, ((Width / 2) / 2), 100);
    ctx.fillText(player2Score, ((Width / 2) * 1.5), 100);

    // 2 rects
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, paddle1Y, 10, paddleWidth);
    ctx.fillRect(Width - 10, paddle2Y, 10, paddleWidth);

    // ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
  }

 /*  update() {




    function KeyListener() {
      this.pressedKeys = [];
      this.keydown = function (e) { this.pressedKeys[e.keyCode] = true };
      this.keyup = function (e) { this.pressedKeys[e.keyCode] = false };
      document.addEventListener("keydown", this.keydown.bind(this));
      document.addEventListener("keyup", this.keyup.bind(this));
    }

    KeyListener.prototype.isPressed = function (key) {
      return this.pressedKeys[key] ? true : false;
    };

    KeyListener.prototype.addKeyPressListener = function (keyCode, callback) {
      document.addEventListener("keypress", function (e) {
        if (e.keyCode === keyCode)
          callback(e);
      });
    };

    const keys = new KeyListener();



    // draw everything on screen



    // draw default if changing game type, else save last draw 
    const GameOver = function () {
      ballSpeedY = 0;
      paddle1Y = Height / 2 - paddleWidth / 2;
      paddle2Y = Height / 2 - paddleWidth / 2;
      player1Score = 0;
      player2Score = 0;
      ctx.textAlign = "center";
      if (winner !== "") {
        ctx.fillStyle = "#888";
        ctx.font = "36px Orbitron";
        ctx.fillText(winner + " WON!", Width / 2, 150);
      } else {
        ballY = Height / 2;
        ballX = Width / 2;
        drawAll();
        gameOver = true;
      }
      ctx.font = "14px Roboto Mono";
      ctx.fillText("Click anywhere to start a new game.", Width / 2, 200);
      document.addEventListener("mousedown", function () {
        gameOver = false;
        winner = "";
      });
    }
  } */

  render() {
    return (
      <div>
        <canvas ref="canvas" width={gameWidth}
          height={gameHeight} id="gameCanvas" />
      </div>
    )
  }
};