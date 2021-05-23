import React, {Component} from 'react';
import {Match, BrowserRouter as Router, Miss, Redirect} from 'react-router';
import IO from 'socket.io-client';

import {Start, Intro, Activities, Activity, Details, NoMatch, Join, Wait, SelectedPlayer} from '../pages/';
import {AppLanguage, Draw} from '../components/';
import {settings, languages, activitiesData} from '../globals/';

let router = {};

class App extends Component {

  state = {
    mainDevice: false,
    appLanguage: `English`,
    room: {
      code: ``,
      devices: [],
      started: false
    },
    intro: {
      currentStep: 1,
      maxStep: 1
    },
    location: ``,
    family: {
      name: ``,
      languages: [],
      members: []
    },
    activity: {
      currentStep: 1,
      playerIds: [],
      players: []
    },
    activities: {
      confirmation: false,
      active: 0,
      completed: []
    },
    search: [],
    selectedPlayer: {},
    drawings: []
  }

  setRouter(r) {
    router = r;
  }

  initSocket() {
    this.socket = IO(`/`);

    this.socket.on(`createdRoom`, room => this.createdRoomWSHandler(room));
    this.socket.on(`joinedRoom`, devices => this.joinedRoomWSHandler(devices));
    this.socket.on(`joinedRoomSuccess`, devices => this.joinedRoomSuccessWSHandler(devices));
    this.socket.on(`leftRoom`, devices => this.leftRoomWSHandler(devices));

    this.socket.on(`busy`, code => this.busyWSHandler(code));
    this.socket.on(`found`, code => this.foundWSHandler(code));
    this.socket.on(`notFound`, code => this.notFoundWSHandler(code));

    this.socket.on(`setDrawingPlayer`, data => this.setDrawingPlayerWSHandler(data));

    this.socket.on(`showActiveDropzone`, () => this.showActiveDropzoneWSHandler());
    this.socket.on(`removeActiveDropzone`, () => this.removeActiveDropzoneWSHandler());

    this.socket.on(`subject`, subject => this.subjectWSHandler(subject));
    this.socket.on(`draw`, data => this.drawWSHandler(data));
    this.socket.on(`clearCanvas`, () => this.clearCanvasWSHandler());

    this.socket.on(`activityFinished`, () => this.activityFinishedWSHandler());
  }

  clearCanvasWSHandler() {
    const canvas = document.querySelector(`.canvas`);
    const context = canvas.getContext(`2d`);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = `rgb(255,255,255)`;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  activityFinishedWSHandler() {
    const {room} = this.state;
    router.transitionTo(`/${room.code}/wait`);
  }

  subjectWSHandler(subject) {
    const {activity, room} = this.state;
    activity.subject = subject;
    this.setState({activity});

    router.transitionTo(`/${room.code}/draw`);
  }

  drawWSHandler(line) {
    const canvas = document.querySelector(`.canvas`);
    const context = canvas.getContext(`2d`);

    context.lineWidth = line[2].size;
    context.lineCap = context.lineJoin =  `round`;
    context.strokeStyle = line[2].color;

    context.beginPath();
    context.moveTo(line[0].x, line[0].y);
    context.lineTo(line[1].x, line[1].y);
    context.stroke();
  }

  showActiveDropzoneWSHandler() {
    const el = document.querySelector(`.activeBorder`);
    el.classList.add(`active`);
  }

  removeActiveDropzoneWSHandler() {
    const el = document.querySelector(`.activeBorder`);
    el.classList.remove(`active`);
  }

  setDrawingPlayerWSHandler({players, playerData, family}) {
    console.log(`This device is ${playerData.name}`);

    const {mainDevice, room, activity} = this.state;

    activity.players = players;

    if (!mainDevice) {
      //console.log(`Show which player you will be`);
      this.onRedirectHandler(`/${room.code}/player`);
    } else {
      //console.log(`Choose a subject`);
    }

    this.setState({activity, family, selectedPlayer: playerData});
  }

  leftRoomWSHandler(devices) {
    const {room} = this.state;
    room.devices = devices;

    const message = `A device disconnected from your session`;
    setTimeout(() => this.setState({message: ``}), 5000);

    this.setState({room, message});
  }

  joinedRoomWSHandler(devices) {
    const message = `A device connected to your session`;
    setTimeout(() => this.setState({message: ``}), 5000);

    const {room} = this.state;
    room.devices = devices;
    this.setState({room, message});
  }

  joinedRoomSuccessWSHandler(devices) {
    const {room} = this.state;
    room.devices = devices;
    this.setState({room});
  }

  busyWSHandler(code) {
    const error = `Room ${code} is busy!`;
    this.setState({error});
  }

  foundWSHandler(code) {
    const {room} = this.state;
    room.code = code;
    this.setState({room});

    router.transitionTo(`/${code}/wait`);
    this.socket.emit(`joinRoom`, code);
  }

  notFoundWSHandler(code) {
    const error = `Room ${code} was not found`;
    this.setState({error});
  }

  createdRoomWSHandler(room) {
    this.setState({room, mainDevice: true});
    router.transitionTo(`/intro/1`);
  }

  componentWillMount() {

    this.initSocket();

    //check everything that's stored in local storage
    //this.checkLocalStorageData();

    if (settings.development) {
      this.addMember();
    }
  }

  addMember() {
    const {family} = this.state;

    const member1 = {
      id: 1,
      name: `Samuel`,
      avatar: `lion`,
      languages: [`Dutch`, `French`],
      age: `21`,
      completed: false
    };

    const member2 = {
      id: 2,
      name: `Emiel`,
      avatar: `pig`,
      languages: [`Dutch`],
      age: `22`,
      completed: false
    };

    const name = `De Pooter`;

    family.name = name;
    family.members = [member1, member2];

    this.setState({family});
  }

  checkLocalStorageData() {
    //check all data from intro
    this.checkIntroData();
  }

  checkIntroData() {
    const storageMaxStep = localStorage.getItem(`maxStepIntro`);
    const {intro} = this.state;
    const {maxStep} = intro;

    if (!storageMaxStep) {
      localStorage.setItem(`maxStepIntro`, maxStep);
    } else {
      intro.maxStep = storageMaxStep;
      intro.maxStep = parseInt(intro.maxStep);
      this.setState({intro});
    }
  }

  doesIntroStepExist(id) {

    const {totalIntroSteps} = settings;
    const {intro} = this.state;
    const {currentStep} = intro;

    if (id > totalIntroSteps || id > currentStep || isNaN(id)) return false;
    else return true;

  }

  onIntroStepUpdateHandler(newStep) {
    const {intro} = this.state;
    const {maxStep} = intro;

    intro.currentStep = newStep;

    if (maxStep < newStep) intro.maxStep = newStep;

    const newSearch = [];

    this.setState({intro, search: newSearch});
  }

  onLocationSubmitHandler(nextStep, location) {
    if (!location) location = `denied`;
    this.setState({location});
    router.transitionTo(`/intro/${nextStep}`);
  }

  onSpokenLangUpdateHandler(memberId, type, language) {

    const {family} = this.state;

    if (type === `family`) {

      const {languages: familyLanguages} = family;

      const index = familyLanguages.indexOf(language);

      if (index >= 0) familyLanguages.splice(index, 1);
      else familyLanguages.push(language);

    } else if (type === `member`) {

      const member = this.findMember(memberId);

      const index = member.languages.indexOf(language);

      if (index >= 0) member.languages.splice(index, 1);
      else member.languages.push(language);

    }

    this.setState({family});

  }

  onSearchLangUpdateHandler(search) {
    const allLanguages = languages.all;

    const found = [];

    if (search) {
      allLanguages.forEach((language => {
        if (language.name.toLowerCase().indexOf(search) >= 0
            || language.name.indexOf(search) >= 0
            || language.nativeName.indexOf(search) >= 0
            || language.nativeName.toLowerCase().indexOf(search) >= 0
          ) found.push(language.name);
      }));
    }

    const {maxLanguageResults} = settings;
    const filtered = found.slice(0, maxLanguageResults);

    this.setState({search: filtered});
  }

  onFamilyNameUpdateHandler(name) {
    const {family} = this.state;
    family.name = name;
    this.setState({family});
  }

  onFamilyNameSubmitHandler(e, name) {
    e.preventDefault();

    const {intro} = this.state;
    const {currentStep} = intro;

    const newStep = currentStep + 1;

    if (name) {
      this.onIntroStepUpdateHandler(newStep);
      router.transitionTo(`/intro/${newStep}`);
    } else {
      console.log(`Family name cannot be empty!`);
    }
  }

  onMembersUpdateHandler(status) {
    const {family} = this.state;
    const {maxPlayers} = settings;

    //take copy of original array
    const familyLanguages = family.languages.slice();

    if (status) {

      if (family.members.length >= maxPlayers) return;

      const familyMember = {
        id: family.members.length + 1,
        name: ``,
        avatar: `unknown`,
        age: `7`,
        languages: familyLanguages,
        completed: false
      };

      family.members.push(familyMember);

    } else {
      if (family.members.length <= 1) return;
      family.members.pop();
    }

    this.setState({family});
  }

  onMemberAvatarUpdateHandler(memberId, avatar) {
    const {family} = this.state;

    //member with id 1 id is 0 in the state
    const stateId = memberId - 1;

    family.members[stateId].avatar = avatar;

    this.setState({family});
  }

  findMember(memberId) {
    const {family} = this.state;
    const {members} = family;

    const member = members.filter(member => member.id === memberId);
    if (member[0]) return member[0];
    return false;
  }

  onMemberNameUpdateHandler(memberId, name) {
    const {family} = this.state;

    //member with id 1 id is 0 in the state
    const stateId = memberId - 1;
    family.members[stateId].name = name;

    this.setState({family});
  }

  onMemberAgeUpdateHandler(memberId, age) {
    const {family} = this.state;

    const stateId = memberId - 1;
    family.members[stateId].age = age;

    this.setState({family});
  }

  onMemberCompletedHandler(id) {
    const {family} = this.state;
    const member = this.findMember(id);
    member.completed = true;
    const newSearch = [];
    this.setState({family, search: newSearch});
  }

  onIntroCompletedHandler() {
    const {family} = this.state;

    //no members -> intro not completed
    if (family.members.length <= 0) return false;

    //check if profiles are completed
    const done = family.members.map(member => {
      return member.completed ? true : false;
    });

    if (done.indexOf(false) >= 0) return false;
    return true;
  }

  onConfirmationHandler(state) {
    const {activities} = this.state;

    if (state) activities.confirmation = true;
    else activities.confirmation = false;

    this.setState({activities});
  }

  onSetActiveHandler(id) {
    const {activities, activity} = this.state;

    activities.active = id;
    activity.currentStep = 1;

    this.setState({activities});
  }

  onRedirectHandler(url) {
    router.transitionTo(url);
  }

  onFinishHandler(id) {
    const {activities} = this.state;
    const completed = activities.completed.slice();

    const alreadyCompleted = completed.indexOf(id);

    //< 0 means it's not in the array yet -> push it
    if (alreadyCompleted < 0) {
      completed.push(id);
      activities.completed = completed;

      this.setState({activities});
    }

    router.transitionTo(`/activities`);
  }

  findActivity(id) {
    const activity = activitiesData[id];
    if (activity) return activity;
  }

  onActivityStepUpdateHandler(newStep) {
    const {activity} = this.state;

    activity.currentStep = newStep;
    this.setState({activity});
  }

  onPlayersSubmitHandler(id, step, playerIds) {
    const {activity} = this.state;
    const {playerIds: oldIds} = activity;

    let ids = oldIds.slice();
    ids = playerIds;

    activity.playerIds = ids;

    this.setState({activity});

    this.onActivityStepUpdateHandler(step + 1);
    this.onRedirectHandler(`/activities/${id}/steps/${step + 1}`);
  }

  findPlayers(playerIds) {
    const {family} = this.state;
    const {members} = family;

    const players = [];

    members.map((member, i) => {
      playerIds.map(id => {
        id = parseInt(id);
        if (i === id) players.push(member);
      });
    });

    return players;
  }

  findPlayersPerDevice(players) {

    const {family} = this.state;
    const {members} = family;

    const updatedPlayers = [];

    members.map(member => {
      players.map(player => {
        player.id = parseInt(player.id);
        member.id = parseInt(member.id);
        console.log(member.id, player.id);
        if (member.id === player.id + 1) {
          member.deviceId = player.deviceId;
          updatedPlayers.push(member);
        }
      });
    });

    return updatedPlayers;
  }

  onLanguagesUpdateHandler(convertedLanguages) {
    const {family} = this.state;

    const member = this.getPlayer(0);
    member.languages = convertedLanguages;

    this.setState({family});
  }

  getPlayer(n) {
    const {family, activity} = this.state;
    const {members} = family;
    const {playerIds} = activity;

    return members[playerIds[n]];
  }

  getLanguage(memberId, language) {
    const player = this.getPlayer(memberId);
    const {languages} = player;

    const foundLanguage = languages.find(l => l.language === language);
    return foundLanguage;
  }

  onLanguageColorUpdateHandler(language, color) {
    const {family} = this.state;

    const oldLanguage = this.getLanguage(0, language);
    oldLanguage.color = color;

    this.setState({family});
  }

  onCustomAvatarUpdateHandler(avatar) {
    //find right member, add custom avatar
    const {activity} = this.state;
    const {playerIds} = activity;

    let memberId = playerIds[0];
    memberId = parseInt(memberId);
    const member = this.findMember(memberId + 1);

    member.customAvatar = avatar;

    this.setState({activity});
  }

  onCreateRoomHandler() {
    this.socket.emit(`createRoom`, this.socket.id);
  }

  onSubmitCodeHandler(code) {
    this.socket.emit(`checkRoom`, code);
  }

  renderMessage() {
    const {message} = this.state;

    let show = ``;
    if (message) show = `show`;

    return (
      <div className={`globalMessage ${show}`}>
        <p className='message'>{message}</p>
      </div>
    );
  }

  onLeaveRoomHandler(code) {
    this.socket.emit(`leaveRoom`, code);

    const room = {
      code: ``,
      devices: [],
      started: false
    };

    this.setState({room});
  }

  onRemoveErrorHandler() {
    this.setState({error: ``});
  }

  onDevicePlayersSubmitHandler(id, step, players) {
    const {activity, room, family} = this.state;

    activity.players = players;
    this.setState({activity});

    const playerIds = [];
    players.map(player => playerIds.push(player.id));

    const playersData = this.findPlayers(playerIds);

    const data = {players: players, playersData: playersData, code: room.code, family};

    this.socket.emit(`updatePlayers`, data);

    this.onActivityStepUpdateHandler(step + 1);
    this.onRedirectHandler(`/activities/${id}/steps/${step + 1}`);
  }

  onSubjectSubmitHandler(id, step, subject) {
    const {activity} = this.state;
    activity.subject = subject;

    this.setState({activity});

    //send subject to other in room
    this.socket.emit(`subject`, subject);

    this.onActivityStepUpdateHandler(step + 1);
    this.onRedirectHandler(`/activities/${id}/steps/${step + 1}`);
  }

  showDragEnteredHandler(deviceId) {
    const {room} = this.state;
    const data = {deviceId: deviceId, code: room.code};
    this.socket.emit(`showActiveDropzone`, data);
  }

  removeDragEnteredHandler(deviceId) {
    const {room} = this.state;
    const data = {deviceId: deviceId, code: room.code};
    this.socket.emit(`removeActiveDropzone`, data);
  }

  emitDrawDataHandler(data) {
    this.socket.emit(`draw`, data);
  }

  onClearCanvasHandler() {
    this.socket.emit(`clearCanvas`);
  }

  onDrawingSubmitHandler(drawing) {
    this.socket.emit(`activityFinished`);

    const {drawings} = this.state;
    const updated = drawings.slice();
    updated.push(drawing);
    this.setState({drawings: updated});
  }

  render() {

    console.log(this.state);
    const {location, family, search, activities, drawings, mainDevice, activity, selectedPlayer, appLanguage, room, error} = this.state;

    return (
      <Router>
        {({router}) => (

          <main>

            {this.setRouter(router)}

            <div className='overlay error'>
              <div className='tabletWrap'>
                <div className='wrong'></div>
                <div className='right'></div>
                <img src='/assets/icons/tablet.svg' className='tablet' />
              </div>
              <p className='text'>Please use a <span className='bold'>tablet</span> and put it in <span className='bold'>landscape view</span>!</p>
            </div>

            <div className='activeBorder'></div>

            <header className='hide'>
              <h1>Express yourself!</h1>
            </header>

            {this.renderMessage()}

            <AppLanguage language={appLanguage} />

            <Match
              exactly pattern='/'
              render={() => {
                return (
                  <Start onCreateRoom={() => this.onCreateRoomHandler()} />
                );
              }}
            />

            <Match
              exactly pattern='/join'
              render={() => {
                return (
                  <Join
                    onSubmitCode={code => this.onSubmitCodeHandler(code)}
                    error={error}
                    onRemoveError={() => this.onRemoveErrorHandler()}
                  />
                );
              }}
            />

            <Match
              exactly pattern='/:id/wait'
              render={({params}) => {

                if (room.code === params.id) {
                  return (
                    <Wait
                      code={params.id}
                      devices={room.devices}
                      onLeaveRoom={code => this.onLeaveRoomHandler(code)}
                    />
                  );
                } else {
                  return <Redirect to='/' />;
                }
              }}
            />

            <Match
              exactly pattern='/:id/draw'
              render={({params}) => {

                const {players: devicePlayers, subject} = activity;

                const players = this.findPlayersPerDevice(devicePlayers);

                if (room.code === params.id && !mainDevice, activity.subject) {
                  return (
                    <Draw
                      mainDevice={mainDevice}
                      players={players}
                      subject={subject}
                      selectedPlayerId={selectedPlayer.id}
                      emitDrawData={data => this.emitDrawDataHandler(data)}
                      onClearCanvas={() => this.onClearCanvasHandler()}
                    />
                  );
                } else {
                  return <Redirect to='/' />;
                }
              }}
            />

            <Match
              exactly pattern='/:id/player'
              render={({params}) => {

                if (selectedPlayer && params.id === room.code) {
                  return (
                    <SelectedPlayer player={selectedPlayer} />
                  );
                } else {
                  return <Redirect to='/' />;
                }
              }}
            />

            <Match
              exactly pattern='/intro/:id'
              render={({params}) => {

                const {room} = this.state;
                let {id} = params;
                id = parseInt(id);

                let stepExists = this.doesIntroStepExist(id);
                if (settings.development) stepExists = true;

                //bestaat de stap en heeft de user een room -> doorgaan
                if (stepExists && room.code) {
                  return (
                    <Intro
                      step={id}
                      family={family}
                      search={search}
                      location={location}
                      onIntroStepUpdate={newStep => this.onIntroStepUpdateHandler(newStep)}
                      onFamilyNameUpdate={familyName => this.onFamilyNameUpdateHandler(familyName)}
                      onFamilyNameSubmit={(e, name) => this.onFamilyNameSubmitHandler(e, name)}
                      onLocationSubmit={(nextStep, location) => this.onLocationSubmitHandler(nextStep, location)}
                      onSpokenLangUpdate={(memberId, type, language) => this.onSpokenLangUpdateHandler(memberId, type, language)}
                      onSearchLangUpdate={searchLanguage => this.onSearchLangUpdateHandler(searchLanguage)}
                      onMembersUpdate={status => this.onMembersUpdateHandler(status)}
                      onIntroCompleted={() => this.onIntroCompletedHandler()}
                    />
                  );
                } else {
                  return <Redirect to='/' />;
                }
              }}
            />

            <Match
              exactly pattern='/intro/:id/members/:memberId/edit/:editId'
              render={({params}) => {

                let {id, memberId, editId} = params;

                id = parseInt(id);
                memberId = parseInt(memberId);
                editId = parseInt(editId);

                const member = this.findMember(memberId);
                const stepExists = this.doesIntroStepExist(id);

                if (stepExists && id === settings.totalIntroSteps && member) {
                  return (
                    <Intro
                      step={id}
                      editStep={editId}
                      member={member}
                      search={search}
                      onMemberAvatarUpdate={(memberId, avatar) => this.onMemberAvatarUpdateHandler(memberId, avatar)}
                      onMemberNameUpdate={(memberId, name) => this.onMemberNameUpdateHandler(memberId, name)}
                      onSearchLangUpdate={searchLanguage => this.onSearchLangUpdateHandler(searchLanguage)}
                      onSpokenLangUpdate={(memberId, type, language) => this.onSpokenLangUpdateHandler(memberId, type, language)}
                      onMemberCompleted={id => this.onMemberCompletedHandler(id)}
                      onMemberAgeUpdate={(memberId, age) => this.onMemberAgeUpdateHandler(memberId, age)}
                    />
                  );
                } else {
                  return <Redirect to='/' />;
                }
              }}
            />

            <Match
              exactly pattern='/activities'
              render={() => {

                const {confirmation, completed} = activities;

                let done = this.onIntroCompletedHandler();
                if (settings.development) done = true;

                if (done) {
                  return (
                    <Activities
                      family={family}
                      confirmation={confirmation}
                      completed={completed}
                      onConfirmation={state => this.onConfirmationHandler(state)}
                      onRedirect={url => this.onRedirectHandler(url)}
                    />
                  );
                } else {
                  return <Redirect to='/' />;
                }
              }}
            />

            <Match
              exactly pattern='/activities/:id/details'
              render={({params}) => {

                let {id} = params;
                const {confirmation, completed} = activities;

                id = parseInt(id);

                let done = this.onIntroCompletedHandler();
                if (settings.development) done = true;

                if (done) {
                  return (
                    <Details
                      id={id}
                      family={family}
                      confirmation={confirmation}
                      completed={completed}
                      onConfirmation={state => this.onConfirmationHandler(state)}
                      onRedirect={url => this.onRedirectHandler(url)}
                    />
                  );
                } else {
                  return <Redirect to='/' />;
                }
              }}
            />

            <Match
              exactly pattern='/activities/:id/steps/:stepId'
              render={({params}) => {

                let {id, stepId} = params;
                id = parseInt(id);
                stepId = parseInt(stepId);

                const {confirmation} = activities;
                const {playerIds, players: devicePlayers, subject} = activity;
                const {members} = family;

                const activityDetails = this.findActivity(id - 1);
                let players = [];
                if (id !== 3) players = this.findPlayers(playerIds);
                else players = this.findPlayersPerDevice(devicePlayers);

                const {steps} = activitiesData[id - 1];

                let done = this.onIntroCompletedHandler();
                if (settings.development) done = true;

                if (done) {
                  //activity exists
                  //the step in state = step you're browsing to (so you can't go to later steps)
                  //stepId has to be lower or equal to the total steps of that activity
                  if (activityDetails && activity.currentStep >= stepId && stepId <= steps) {
                    return (
                      <Activity
                        id={id}
                        activity={activityDetails}
                        step={stepId}
                        mainDevice={mainDevice}
                        members={members}
                        confirmation={confirmation}
                        players={players}
                        subject={subject}
                        selectedPlayerId={selectedPlayer.id}
                        familyLanguages={family.languages}
                        room={room}
                        drawings={drawings}
                        onConfirmation={state => this.onConfirmationHandler(state)}
                        onSetActive={id => this.onSetActiveHandler(id)}
                        onRedirect={url => this.onRedirectHandler(url)}
                        onPlayersSubmit={(id, step, playerIds) => this.onPlayersSubmitHandler(id, step, playerIds)}
                        onFinish={id => this.onFinishHandler(id)}
                        onActivityStepUpdate={newStep => this.onActivityStepUpdateHandler(newStep)}
                        onLanguagesUpdate={languages => this.onLanguagesUpdateHandler(languages)}
                        onLanguageColorUpdate={(language, color) => this.onLanguageColorUpdateHandler(language, color)}
                        onCustomAvatarUpdate={avatar => this.onCustomAvatarUpdateHandler(avatar)}
                        onDevicePlayersSubmit={(id, step, players) => this.onDevicePlayersSubmitHandler(id, step, players)}
                        onSubjectSubmit={(id, step, subject) => this.onSubjectSubmitHandler(id, step, subject)}
                        showDragEntered={deviceId => this.showDragEnteredHandler(deviceId)}
                        removeDragEntered={deviceId => this.removeDragEnteredHandler(deviceId)}
                        emitDrawData={data => this.emitDrawDataHandler(data)}
                        onDrawingSubmit={drawing => this.onDrawingSubmitHandler(drawing)}
                        onClearCanvas={() => this.onClearCanvasHandler()}
                      />
                    );
                  } else {
                    return <Redirect to='/activities' />;
                  }
                } else {
                  return <Redirect to='/activities' />;
                }
              }}
            />

            <Miss component={NoMatch} />

          </main>
        )}
      </Router>
    );
  }

}

export default App;
