import React, {PropTypes} from 'react';
import {ExplanationVideo, SelectDevices, ShowSessionCode, PickPlayers, Subject, Draw} from './';

const DrawSomething = ({id, step, members, activity, drawings, mainDevice, onClearCanvas, onDrawingSubmit, players, subject, selectedPlayerId, room, familyLanguages, emitDrawData, showDragEntered, removeDragEntered, onSubjectSubmit, onDevicePlayersSubmit, onFinish, onPlayersSubmit, onActivityStepUpdate, onRedirect}) => {

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
      <SelectDevices
        id={id}
        step={step}
        activity={activity}
        onActivityStepUpdate={onActivityStepUpdate}
      />
    );

  case 3:
    return (
      <ShowSessionCode
        id={id}
        step={step}
        room={room}
        activity={activity}
        onActivityStepUpdate={onActivityStepUpdate}
      />
    );

  case 4:
    return (
      <PickPlayers
        id={id}
        step={step}
        activity={activity}
        members={members}
        room={room}
        drawings={drawings}
        numberOfPlayers={room.devices.length}
        onFinish={onFinish}
        onPlayersSubmit={onPlayersSubmit}
        onDevicePlayersSubmit={onDevicePlayersSubmit}
        showDragEntered={showDragEntered}
        removeDragEntered={removeDragEntered}
      />
    );

  case 5:
    return (
      <Subject
        id={id}
        step={step}
        familyLanguages={familyLanguages}
        onSubjectSubmit={onSubjectSubmit}
      />
    );

  case 6:
    return (
      <Draw
        id={id}
        step={step}
        players={players}
        emitDrawData={emitDrawData}
        selectedPlayerId={selectedPlayerId}
        subject={subject}
        mainDevice={mainDevice}
        onDrawingSubmit={onDrawingSubmit}
        onClearCanvas={onClearCanvas}
      />
    );
  }
};

DrawSomething.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  members: PropTypes.array,
  room: PropTypes.object,
  familyLanguages: PropTypes.array,
  selectedPlayerId: PropTypes.number,
  subject: PropTypes.string,
  mainDevice: PropTypes.bool,
  players: PropTypes.array,
  drawings: PropTypes.array,
  activity: PropTypes.object,
  onActivityStepUpdate: PropTypes.func,
  onRedirect: PropTypes.func,
  onFinish: PropTypes.func,
  onPlayersSubmit: PropTypes.func,
  onDevicePlayersSubmit: PropTypes.func,
  onSubjectSubmit: PropTypes.func,
  showDragEntered: PropTypes.func,
  removeDragEntered: PropTypes.func,
  emitDrawData: PropTypes.func,
  onDrawingSubmit: PropTypes.func,
  onClearCanvas: PropTypes.func
};

export default DrawSomething;
