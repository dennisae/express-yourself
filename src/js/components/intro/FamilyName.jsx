import React, {PropTypes} from 'react';
import {Next} from '../../components';

const FamilyName = ({step, familyName, onIntroStepUpdate, onFamilyNameUpdate, onFamilyNameSubmit}) => {
  return (
    <section className='intro familyName fullPage'>

      <div className='headerBg'></div>
      <img className='headerBgExtra' src='/assets/headers/familyName/family.svg' />

      <div className='content'>
        <h2 className='title'>Family</h2>

        <p className='subtitle'>Which <span className='bold'>lovely family</span> will get to play with us?</p>

        <form className='form' onSubmit={e => onFamilyNameSubmit(e, this.familyName.value)}>
          <div className='formGroup'>
            <label className='hide' htmlFor='familyName'>Family Name</label>
            <input
              type='text'
              className='textInput'
              value={familyName}
              id='familyName'
              ref={name => this.familyName = name}
              placeholder='De Pooter'
              maxLength='25'
              onChange={() => onFamilyNameUpdate(this.familyName.value)}
            />
          </div>

          <input type='submit' className='hide' />

          <div className='nextWrap'>
            {renderNext(step, onIntroStepUpdate, familyName)}
          </div>

        </form>
      </div>

    </section>
  );
};

const renderNext = (step, onIntroStepUpdate, familyName) => {
  if (!familyName) return;
  return <Next step={step} onIntroStepUpdate={onIntroStepUpdate} text={`${familyName}, check!`} />;
};

FamilyName.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  familyName: PropTypes.string,
  onFamilyNameUpdate: PropTypes.func,
  onFamilyNameSubmit: PropTypes.func
};

export default FamilyName;
