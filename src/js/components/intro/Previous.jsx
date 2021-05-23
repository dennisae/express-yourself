import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Previous = ({step, text, onIntroStepUpdate}) => {

  const previousStep = step - 1;
  if (!text) text = `Previous step`;

  return (
    <Link
      to={`/intro/${previousStep}`}
      className='btn backBtn'
      onClick={() => onIntroStepUpdate(previousStep)}>
      <img className='icon' src='/assets/icons/back.svg' />
      <span className='text'>{text}</span>
    </Link>
  );
};

Previous.propTypes = {
  text: PropTypes.string,
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func
};

export default Previous;
