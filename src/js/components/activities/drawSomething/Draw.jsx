import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {activitiesData} from '../../../globals';
import {Playing} from '../';

let canvas,
  context = undefined;

class Draw extends Component {

  state = {
    player: {},
    position: {x: 0, y: 0},
    lineWidth: 3,
    color: ``,
    drawing: false
  }

  componentWillMount() {
    this.setPlayer();
  }

  componentDidMount() {

    const {player} = this.state;
    player.id = parseInt(player.id);

    canvas = document.querySelector(`.canvas`);
    context = canvas.getContext(`2d`);

    const color = activitiesData[2].colors[player.id - 1];
    this.setState({color});

    this.preventDefaultGestures();

    this.fitToContainer(canvas);
    this.setCanvasBg(canvas);

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

  setCanvasBg(canvas) {
    context.fillStyle = `rgb(255,255,255)`;
    context.fillRect(0, 0, canvas.width, canvas.height);
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
    const {emitDrawData} = this.props;
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
    emitDrawData(line);
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
      if (e.target === canvas) e.preventDefault();
    }, false);
    document.body.addEventListener(`touchend`, e => {
      if (e.target === canvas) e.preventDefault();
    }, false);
    document.body.addEventListener(`touchmove`, e => {
      if (e.target === canvas) e.preventDefault();
    }, false);
  }

  findPlayer(players, playerId) {
    const found = players.find(player => player.id === playerId);
    if (found) return found;
  }

  setPlayer() {
    const {players, selectedPlayerId} = this.props;
    const player = this.findPlayer(players, selectedPlayerId);

    this.setState({player});
  }

  renderPlayers() {
    const {players} = this.props;

    return players.map((player, i) => {
      return (
        <li key={i} className='player'>
          <p className='color' style={{backgroundColor: `${activitiesData[2].colors[player.id - 1]}`}}>
            <span className='hide'>{activitiesData[2].colors[player.id - 1]}</span>
          </p>
          <img src={`/assets/avatars/${player.avatar}.svg`} className='avatar' />
          <p className='name hide'>{player.name}</p>
        </li>
      );
    });
  }

  handleDrawingSubmit() {
    const {players, onDrawingSubmit} = this.props;

    players.map(player => {
      player.color = activitiesData[2].colors[player.id - 1];
    });

    const {subject} = this.props;
    const image = canvas.toDataURL(`image/jpeg`, 1);

    const date = new Date();
    const ms = date.getTime();

    const drawing = {
      image: image,
      time: ms,
      members: players,
      subject: subject
    };

    onDrawingSubmit(drawing);
  }

  renderSubmitDrawing() {
    const {id, step, mainDevice} = this.props;

    if (!mainDevice) return;

    return (
      <Link className='btn iconBtn' to={`/activities/${id}/steps/${step - 2}`} onClick={() => this.handleDrawingSubmit()}>
        <img className='icon' src='/assets/icons/check.svg' />
        <span className='text hide'>Submit drawings</span>
      </Link>
    );
  }

  onBrushSizeUpdate(value) {
    console.log(`NEW VALUE: ${value}`);
    this.setState({lineWidth: value});
  }

  onClearCanvasClick(e) {
    e.preventDefault();
    const {onClearCanvas} = this.props;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = `rgb(255,255,255)`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    onClearCanvas();
  }

  render() {

    const {player, lineWidth} = this.state;
    const {subject} = this.props;

    return (
      <div className='draw fullPage'>

        <div className='content'>
          <p className='beforeTitle'>Draw something around the topic</p>
          <h2 className='title' data-before={subject}>{subject}</h2>

          <div className='canvasWrap'>
            <canvas className='canvas'></canvas>
          </div>

          <div className='varia'>
            <div className='pencil'></div>
            <div className='brush'></div>
          </div>
        </div>

        <div className='tools'>
          <button onClick={e => this.onClearCanvasClick(e)} className='btn clearCanvas'>
            <img src='/assets/icons/trash.svg' className='icon' />
            <span className='hide'>Clear canvas</span>
          </button>

          <div className='brushSizeWrap'>
            <div className='brush largeBrush'></div>
            <input
              type='range'
              className='brushSize'
              value={lineWidth}
              step='1'
              min='1'
              max='9'
              id='brushSize'
              ref={brushSize => this.brushSize = brushSize}
              onChange={() => this.onBrushSizeUpdate(this.brushSize.value)}
            />
            <label htmlFor='brushSize' className='hide'>Brush size</label>
            <div className='brush smallBrush'></div>
          </div>

          {this.renderSubmitDrawing()}
        </div>

        <ul className='players'>
          {this.renderPlayers()}
        </ul>

        <Playing player={player} />
      </div>
    );
  }
}

Draw.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  subject: PropTypes.string,
  selectedPlayerId: PropTypes.number,
  emitDrawData: PropTypes.func,
  players: PropTypes.array,
  mainDevice: PropTypes.bool,
  onDrawingSubmit: PropTypes.func,
  onClearCanvas: PropTypes.func
};

export default Draw;
