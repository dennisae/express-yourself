import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {avatars} from '../../globals';

const MemberAvatar = ({step, editStep, member, onMemberAvatarUpdate, onMemberNameUpdate, onMemberAgeUpdate}) => {

  const {id: memberId, avatar: selectedAvatar, name, age} = member;

  return (
    <section className='intro memberAvatar fullPage'>

      <div className='headerBg'></div>

      <div className='content'>
        <h2 className='hide'>Choose your avatar and give it your name!</h2>

        <div className='avatarWrap'>
          <div className='icon'><span className='hide'>Crown</span></div>
          {renderSelectedAvatar(selectedAvatar)}
        </div>

        <form onSubmit={e => e.preventDefault()}>
          <ul className='list-inline avatars'>
            {avatars.map((avatar, i) => {
              const {image} = avatar;
              return (
                <li key={i}>
                  <input
                    className='checkbox hide'
                    type='radio'
                    name='avatar'
                    id={image}
                    checked={checkAvatar(image, selectedAvatar)}
                    onChange={() => onMemberAvatarUpdate(memberId, image)}
                  />
                  <label htmlFor={image} className='possibleAvatarWrap'>
                    {renderChecked(selectedAvatar, image)}
                    <img src={`/assets/avatars/${image}.svg`} className='possibleAvatar' />
                  </label>
                </li>
              );
            })}
          </ul>

          <div className='formGroup'>
            <input
              type='range'
              className='ageSlider'
              value={age}
              step='1'
              min='7'
              max='70'
              orient='vertical'
              id='memberAge'
              ref={memberAge => this.memberAge = memberAge}
              onChange={() => onMemberAgeUpdate(memberId, this.memberAge.value)}
            />
            <label htmlFor='memberAge' className='memberAge'>{age}</label>
            <p>years old</p>
          </div>

          <div className='formGroup'>
            <label htmlFor='memberName' className='hide'>Your name</label>
            <input
              type='text'
              className='textInput'
              maxLength='20'
              value={name}
              id='memberName'
              ref={memberName => this.memberName = memberName}
              placeholder='Your name'
              onChange={() => onMemberNameUpdate(memberId, this.memberName.value)}
            />
          </div>
        </form>

        <div className='nextWrap'>
          {renderContinueBtn(name, selectedAvatar, step, memberId, editStep)}
        </div>
      </div>

    </section>
  );
};

const renderChecked = (selectedAvatar, image) => {
  if (selectedAvatar !== image) return;

  return (
    <div className='checked'>
      <img src='/assets/icons/check.svg' className='icon' />
    </div>
  );
};

const renderSelectedAvatar = selectedAvatar => {
  if (selectedAvatar === `unknown`) {
    return (
      <div className='avatar'>
        <p>?</p>
      </div>
    );
  } else {
    return <img src={`/assets/avatars/${selectedAvatar}.svg`} className='avatar' />;
  }
};

const renderContinueBtn = (name, selectedAvatar, step, memberId, editStep) => {
  if (selectedAvatar !== `unknown` && name) {
    return (
      <Link
        to={`/intro/${step}/members/${memberId}/edit/${editStep + 1}`}
        className='btn'>
        <img className='icon' src='/assets/icons/check.svg' />
        <span className='text'>{`${name} ${checkSound(selectedAvatar)}!`}</span>
      </Link>
    );
  }
};

const checkSound = selectedAvatar => {
  const found = avatars.filter(avatar => avatar.image === selectedAvatar);

  if (found[0]) return found[0].sound;
  else return `yells`;
};

const checkAvatar = (image, selectedAvatar) => {
  if (image === selectedAvatar) return true;
  return false;
};

MemberAvatar.propTypes = {
  step: PropTypes.number,
  editStep: PropTypes.number,
  member: PropTypes.object,
  onMemberAvatarUpdate: PropTypes.func,
  onMemberNameUpdate: PropTypes.func,
  onMemberAgeUpdate: PropTypes.func
};

export default MemberAvatar;
