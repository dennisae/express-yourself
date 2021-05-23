import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const SelectDevices = ({id, step, activity, onActivityStepUpdate}) => {
  return (
    <section className='fullPage selectDevices'>

      <div className='headerBg'></div>

      <div className='titleWrap'>
        <h2 className='title' data-before={activity.title}>{activity.title}</h2>
      </div>

      <div className='content'>

        <div className='possibleDevice'>
          <Link to={`/activities/${id}/steps/${step + 2}`} className='btn iconBtn' onClick={() => onActivityStepUpdate(step + 2)}>
            <img className='icon' src={`/assets/icons/device.svg`} />
          </Link>
          <p className='text'>one device</p>
        </div>

        <p className='or'>or</p>

        <div className='possibleDevice'>
          <Link to={`/activities/${id}/steps/${step + 1}`} className='btn iconBtn' onClick={() => onActivityStepUpdate(step + 1)}>
            <img className='icon' src={`/assets/icons/devices.svg`} />
          </Link>
          <p className='text'>multiple devices</p>
        </div>
      </div>

    </section>
  );
};

SelectDevices.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  activity: PropTypes.object,
  onActivityStepUpdate: PropTypes.func
};

export default SelectDevices;
