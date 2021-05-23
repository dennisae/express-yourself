import React, {PropTypes} from 'react';
import {ExplanationVideo} from './';

const AnimationReaction = ({id, step, activity}) => {

  switch (step) {
  case 1:
    return (
      <ExplanationVideo
        id={id}
        step={step}
        activity={activity}
      />
    );
  }

};

AnimationReaction.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  activity: PropTypes.object
};

export default AnimationReaction;
