import React, {PropTypes} from 'react';

const Allow = ({step, onIntroStepUpdate, onLocationCheck}) => {

  const nextStep = step + 1;

  return (
    <button
      className='btn iconBtn allowBtn'
      onClick={() => {
        onLocationCheck(nextStep);
        onIntroStepUpdate(nextStep);
      }}>
      <img className='icon allowIcon' src='/assets/icons/check.svg' />
      <span className='text hide'>Allow</span>
    </button>
  );
};

Allow.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  onLocationCheck: PropTypes.func
};

export default Allow;
