import React, {Component, PropTypes} from 'react';
import {Next} from './';

class ExplanationVideo extends Component {

  state = {
    paused: true,
    timeLeft: ``
  }

  onTimeUpdate() {
    const player = document.querySelector(`.video`);
    const time = Math.floor(parseInt(player.duration - player.currentTime));

    let m = parseInt(time / 60, 10);
    let s = time % 60;

    m = (`0${m}`).slice(- 2);
    s = (`0${s}`).slice(- 2);

    this.setState({timeLeft: `${m}:${s}`});
  }

  renderPlayBtn() {
    const player = document.querySelector(`.video`);

    if (!player) return;

    if (player.paused) {
      return (
        <button
          className='btn'
          onClick={() => this.togglePause()}>
          <img className='icon' src={`/assets/icons/play.svg`} />
        </button>
      );
    }

    return (
      <button
        className='btn'
        onClick={() => this.togglePause()}>
        <img className='icon' src={`/assets/icons/pause.svg`} />
      </button>
    );

  }

  onEnded() {
    const {id, step, onRedirect, onActivityStepUpdate} = this.props;
    const nextStep = step + 1;

    //activity 2 is only intro;
    if (id === 2) return;

    onActivityStepUpdate(nextStep);

    setTimeout(() => onRedirect(`/activities/${id}/steps/${nextStep}`), 1000);
  }

  togglePause() {
    const player = document.querySelector(`.video`);
    player.paused ? player.play() : player.pause();
    this.setState({paused: player.paused});
  }

  renderSkipBtn() {

    const {id, step, onActivityStepUpdate} = this.props;

    //activity 2 has nothing to skip to
    if (id === 2) return;

    return (
      <div className='skipBtn'>
        <Next id={id} step={step} text='Skip intro' icon='back' onActivityStepUpdate={onActivityStepUpdate} />
      </div>
    );
  }

  render() {

    const {activity} = this.props;
    const {timeLeft} = this.state;

    return (
      <section className={`${activity.name}Activity introVideo fullPage`}>

        <header className='header'>
          <h3 className='title' data-before={`${activity.title}: Intro`}>{activity.title}: Intro</h3>
        </header>

        <video
          width='320'
          height='240'
          autoPlay
          className='video'
          onClick={() => this.togglePause()}
          onTimeUpdate={() => this.onTimeUpdate()}
          onEnded={() => this.onEnded()}
          >
          <source src={`/assets/videos/${activity.video}`} type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        <div className='controls'>

          <div className='left'>
            <div className='playBtn'>
              {this.renderPlayBtn()}
            </div>

            <div className='time'>{timeLeft}</div>
          </div>

          {this.renderSkipBtn()}
        </div>
      </section>
    );
  }
}

ExplanationVideo.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  activity: PropTypes.object,
  onActivityStepUpdate: PropTypes.func,
  onRedirect: PropTypes.func
};

export default ExplanationVideo;
