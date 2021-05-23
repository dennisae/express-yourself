import React, {PropTypes} from 'react';
import {ExplanationVideo, PickPlayers, ColorLanguages, CustomiseAvatar} from './';

const Customise = ({id, step, members, players, onRedirect, activity, onFinish, onActivityStepUpdate, onPlayersSubmit, onLanguagesUpdate, onLanguageColorUpdate, onCustomAvatarUpdate}) => {

  switch (step) {
  case 1:
    return (
      <ExplanationVideo
        id={id}
        step={step}
        activity={activity}
        onActivityStepUpdate={onActivityStepUpdate}
        onRedirect={onRedirect}
      />
    );

  case 2:
    return (
      <PickPlayers
        id={id}
        step={step}
        activity={activity}
        members={members}
        numberOfPlayers={1}
        onFinish={onFinish}
        onPlayersSubmit={onPlayersSubmit}
      />
    );

  case 3:
    return (
      <ColorLanguages
        id={id}
        step={step}
        activityName={activity.name}
        player={players[0]}
        onLanguagesUpdate={onLanguagesUpdate}
        onLanguageColorUpdate={onLanguageColorUpdate}
        onActivityStepUpdate={onActivityStepUpdate}
      />
    );

  case 4:
    return (
      <CustomiseAvatar
        id={id}
        step={step}
        player={players[0]}
        onCustomAvatarUpdate={onCustomAvatarUpdate}
      />
    );

  }
};

Customise.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  members: PropTypes.array,
  players: PropTypes.array,
  activity: PropTypes.object,
  onFinish: PropTypes.func,
  onActivityStepUpdate: PropTypes.func,
  onPlayersSubmit: PropTypes.func,
  onLanguagesUpdate: PropTypes.func,
  onLanguageColorUpdate: PropTypes.func,
  onCustomAvatarUpdate: PropTypes.func,
  onRedirect: PropTypes.func
};

export default Customise;
