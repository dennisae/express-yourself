import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Next = ({step, onIntroStepUpdate, text}) => {
  text = text || `Next step`;

  const nextStep = step + 1;

  return (
    <Link
      to={`/intro/${nextStep}`}
      className='btn'
      onClick={() => onIntroStepUpdate(nextStep)}>
      <img className='icon' src='/assets/icons/check.svg' />
      <span className='text'>{text}</span>
    </Link>
  );
};

Next.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  text: PropTypes.string
};

export default Next;
