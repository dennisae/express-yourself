import React, {PropTypes} from 'react';

const Close = ({onConfirmation}) => {

  return (
    <button className='btn closeBtn' onClick={() => onConfirmation(true)}>
      <span className='hide'>Close</span>
    </button>
  );
};

Close.propTypes = {
  onConfirmation: PropTypes.func
};

export default Close;
