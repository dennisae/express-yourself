import React, {PropTypes} from 'react';

const Finish = ({id, onFinish}) => {
  return (
    <button
      className='btn iconBtn'
      onClick={() => onFinish(id)}>
      <img className='icon' src='/assets/icons/check.svg' />
      <span className='text hide'>Finish activity</span>
    </button>
  );
};

Finish.propTypes = {
  id: PropTypes.number,
  onFinish: PropTypes.func
};

export default Finish;
