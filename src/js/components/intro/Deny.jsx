import React, {PropTypes} from 'react';

const Deny = ({step, onIntroStepUpdate, onLocationSubmit}) => {

  const nextStep = step + 1;

  return (
    <button
      className='btn iconBtn denyBtn'
      onClick={() => {
        onLocationSubmit(nextStep, false);
        onIntroStepUpdate(nextStep);
      }}>
      <img className='icon' src='/assets/icons/close.svg' />
      <span className='text hide'>Deny</span>
    </button>
  );
};

Deny.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  onLocationSubmit: PropTypes.func
};

export default Deny;
