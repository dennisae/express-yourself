import React, {Component, PropTypes} from 'react';
import {Close, CloseConfirmation, Customise, AnimationReaction, DrawSomething} from '../components/activities';

class Activity extends Component {

  componentWillMount() {
    const {id, onSetActive} = this.props;
    onSetActive(id);
  }

  renderActivity() {
    const {id, step, members, players, activity, drawings, mainDevice, onClearCanvas, onDrawingSubmit, selectedPlayerId, subject, room, familyLanguages, showDragEntered, emitDrawData, removeDragEntered, onSubjectSubmit, onDevicePlayersSubmit, onFinish, onRedirect, onActivityStepUpdate, onPlayersSubmit, onLanguagesUpdate, onLanguageColorUpdate, onCustomAvatarUpdate} = this.props;

    switch (id) {
    case 1:
      return (
        <Customise
          id={id}
          step={step}
          members={members}
          players={players}
          activity={activity}
          onFinish={onFinish}
          onActivityStepUpdate={onActivityStepUpdate}
          onPlayersSubmit={onPlayersSubmit}
          onLanguagesUpdate={onLanguagesUpdate}
          onLanguageColorUpdate={onLanguageColorUpdate}
          onCustomAvatarUpdate={onCustomAvatarUpdate}
          onRedirect={onRedirect}
        />
      );

    case 2:
      return (
        <AnimationReaction
          id={id}
          step={step}
          activity={activity}
        />
      );

    case 3:
      return (
        <DrawSomething
          id={id}
          step={step}
          members={members}
          players={players}
          selectedPlayerId={selectedPlayerId}
          subject={subject}
          activity={activity}
          mainDevice={mainDevice}
          familyLanguages={familyLanguages}
          room={room}
          onActivityStepUpdate={onActivityStepUpdate}
          onRedirect={onRedirect}
          onFinish={onFinish}
          onPlayersSubmit={onPlayersSubmit}
          onDevicePlayersSubmit={onDevicePlayersSubmit}
          onSubjectSubmit={onSubjectSubmit}
          showDragEntered={showDragEntered}
          removeDragEntered={removeDragEntered}
          emitDrawData={emitDrawData}
          onDrawingSubmit={onDrawingSubmit}
          drawings={drawings}
          onClearCanvas={onClearCanvas}
        />
      );
    }
  }

  render() {

    const {activity, confirmation, onSetActive, onConfirmation, onRedirect} = this.props;

    return (
      <div className='activity fullPage'>

        <CloseConfirmation
          title={activity.title}
          confirmation={confirmation}
          onSetActive={onSetActive}
          onRedirect={onRedirect}
          onConfirmation={onConfirmation}
        />

        <Close
          confirmation={confirmation}
          onSetActive={onSetActive}
          onRedirect={onRedirect}
          onConfirmation={onConfirmation}
        />

        <h2 className='hide'>{activity.title}</h2>

        {this.renderActivity()}

      </div>
    );
  }
}

Activity.propTypes = {
  id: PropTypes.number,
  activity: PropTypes.object,
  members: PropTypes.array,
  players: PropTypes.array,
  room: PropTypes.object,
  step: PropTypes.number,
  selectedPlayerId: PropTypes.number,
  familyLanguages: PropTypes.array,
  confirmation: PropTypes.bool,
  subject: PropTypes.string,
  mainDevice: PropTypes.bool,
  drawings: PropTypes.array,
  onSetActive: PropTypes.func,
  onConfirmation: PropTypes.func,
  onRedirect: PropTypes.func,
  onPlayersSubmit: PropTypes.func,
  onFinish: PropTypes.func,
  onActivityStepUpdate: PropTypes.func,
  onLanguagesUpdate: PropTypes.func,
  onLanguageColorUpdate: PropTypes.func,
  onCustomAvatarUpdate: PropTypes.func,
  onDevicePlayersSubmit: PropTypes.func,
  onSubjectSubmit: PropTypes.func,
  showDragEntered: PropTypes.func,
  removeDragEntered: PropTypes.func,
  emitDrawData: PropTypes.func,
  onDrawingSubmit: PropTypes.func,
  onClearCanvas: PropTypes.func
};

export default Activity;
