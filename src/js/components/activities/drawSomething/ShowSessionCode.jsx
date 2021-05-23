import React, {PropTypes} from 'react';
import {Next} from '../';

const ShowSessionCode = ({id, step, room, onActivityStepUpdate}) => {
  return (
    <section className='fullPage showSessionCode'>

      <div className='headerBg'></div>

      <div className='titleWrap'>
        <h2 className='title' data-before='Connect devices'>Connect devices</h2>
      </div>

      <div className='content'>
        <p className='explanation'>Go to <span className='bold'>https://express-yourself.com/join</span> on your other device and fill in the code below!</p>

        <p className='code btn'>{room.code ? room.code : `You're not in a room!`}</p>
      </div>

      <div className='connected'>
        <p className='hide'>Connected devices</p>
        <div className='icon'></div>
        <p className='text'>{room.devices.length}</p>
      </div>

      <div className='footer'>
        {renderNext(id, step, room, onActivityStepUpdate)}
      </div>

    </section>
  );
};

const renderNext = (id, step, room, onActivityStepUpdate) => {
  const {devices} = room;

  // if (devices.length <= 1) return (
  //   <p className='btn disabled'>
  //     <img className='icon' src={`/assets/icons/close.svg`} />
  //     <span className='text'>Connect more devices</span>
  //   </p>
  // );

  if (devices.length <= 1) return;

  return <Next id={id} step={step} text={`Let's begin!`} onActivityStepUpdate={onActivityStepUpdate} />;
};

ShowSessionCode.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  activity: PropTypes.object,
  room: PropTypes.object,
  onActivityStepUpdate: PropTypes.func
};

export default ShowSessionCode;
