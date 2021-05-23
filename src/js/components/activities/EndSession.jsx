import React, {PropTypes} from 'react';

const EndSession = ({onConfirmation}) => {
  return (
    <button className='btn' onClick={() => onConfirmation(true)}>
      <img src='/assets/icons/complete.svg' className='icon complete' alt='Complete session' />
      <span className='hide'>Complete session</span>
    </button>
  );
};

EndSession.propTypes = {
  onConfirmation: PropTypes.func
};

export default EndSession;
