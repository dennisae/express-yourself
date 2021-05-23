import React, {Component} from 'react';
import {activitiesData} from '../globals';

let canvas,
  context = undefined;

class Drawing extends Component {

  state = {
    position: {x: 0, y: 0},
    lineWidth: 3,
    color: ``,
    drawing: false
  }

  componentDidMount() {
    canvas = document.querySelector(`.canvas`);
    context = canvas.getContext(`2d`);

    const color = activitiesData[2].colors[3];
    this.setState({color});

    this.preventDefaultGestures();

    this.fitToContainer(canvas);

    canvas.addEventListener(`mousedown`, e => this.onMouseDown(e));
    canvas.addEventListener(`mouseup`, e => this.onMouseUp(e));
    canvas.addEventListener(`mousemove`, e => this.draw(e));
    canvas.addEventListener(`mouseleave`, e => this.onMouseLeave(e));

    canvas.addEventListener(`touchstart`, e => {

      const touch = e.touches[0];
      const mouseEvent = new MouseEvent(`mousedown`, {
        clientX: touch.clientX,
        clientY: touch.clientY
      });

      canvas.dispatchEvent(mouseEvent);

    }, false);

    canvas.addEventListener(`touchend`, () => {

      const mouseEvent = new MouseEvent(`mouseup`, {});
      canvas.dispatchEvent(mouseEvent);

    }, false);

    canvas.addEventListener(`touchmove`, e => {

      const touch = e.touches[0];
      const mouseEvent = new MouseEvent(`mousemove`, {
        clientX: touch.clientX,
        clientY: touch.clientY
      });

      canvas.dispatchEvent(mouseEvent);

    }, false);

  }

  onMouseLeave() {
    this.setState({drawing: false});
  }

  onMouseUp() {
    this.setState({drawing: false});
  }

  onMouseDown(e) {
    this.setPosition(e);
    this.setState({drawing: true});
  }

  draw(e) {

    const {position, color, lineWidth, drawing} = this.state;
    if (!drawing) return;

    const previousPosition = {x: position.x, y: position.y};

    context.beginPath();

    context.lineWidth = lineWidth;
    context.lineCap = context.lineJoin =  `round`;
    context.strokeStyle = color;

    context.moveTo(position.x, position.y);
    this.setPosition(e);
    context.lineTo(position.x, position.y);

    context.stroke();

    const type = {
      size: lineWidth,
      color: color
    };

    const line = [previousPosition, {x: position.x, y: position.y}, type];
    //emit socket met gegevens hierboven

    console.log(line);
  }

  setPosition(e) {
    const {position} = this.state;

    position.x = e.clientX - canvas.offsetLeft;
    position.y = e.clientY - canvas.offsetTop;

    this.setState({position});
  }

  fitToContainer(canvas) {
    canvas.style.width = `100%`;
    canvas.style.height = `100%`;

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  preventDefaultGestures() {
    document.body.addEventListener(`touchstart`, e => {
      if (e.target === canvas) {
        e.preventDefault();
      }
    }, false);
    document.body.addEventListener(`touchend`, e => {
      if (e.target === canvas) {
        e.preventDefault();
      }
    }, false);
    document.body.addEventListener(`touchmove`, e => {
      if (e.target === canvas) {
        e.preventDefault();
      }
    }, false);
  }

  render() {

    return (
      <div className='draw fullPage'>
        <div className='canvasWrap'>
          <canvas className='canvas'></canvas>
        </div>
      </div>
    );
  }

}

export default Drawing;
