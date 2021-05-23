import React, {PropTypes} from 'react';
import {Previous, Deny, Allow} from '../../components';
import 'whatwg-fetch';

const Location = ({step, onIntroStepUpdate, onLocationSubmit}) => {
  return (
    <section className='intro allowLocation fullPage'>

      <div className='headerBg'></div>
      <img className='headerBgExtra' src='/assets/headers/location/world.svg' />

      <div className='content'>

        <div className='contentText'>
          <h2 className='title'>Country?</h2>

          <div className='subtitle'>
            <p>Can we check from <span className='bold'>which country</span> your location?</p>
            <p>This information is used to determine the most spoken languages in this region.</p>
          </div>
        </div>


        <ul className='btnList list-inline'>
          <li>
            <Previous step={step} text='Family name' onIntroStepUpdate={onIntroStepUpdate} />
          </li>
          <li>
            <Allow step={step} onIntroStepUpdate={onIntroStepUpdate} onLocationCheck={nextStep => onLocationCheckHandler(nextStep, onLocationSubmit)} />
          </li>
          <li>
            <Deny step={step} onIntroStepUpdate={onIntroStepUpdate} onLocationSubmit={onLocationSubmit} />
          </li>
        </ul>
      </div>

    </section>
  );
};

const onLocationCheckHandler = (nextStep, onLocationSubmit) => {

  editBtns();

  fetch(`https://ipinfo.io/json`)
    .then(response => response.json())
    .then(result => onLocationSubmit(nextStep, result.country))
    .catch(() => onLocationSubmit(nextStep, `denied`));
};

const editBtns = () => {
  const allow = document.querySelector(`.allowIcon`);
  allow.classList.add(`animate`);

  const deny = document.querySelector(`.denyBtn`);
  deny.classList.add(`hide`);

  const back = document.querySelector(`.backBtn`);
  back.classList.add(`hide`);
};

Location.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  onLocationSubmit: PropTypes.func
};

export default Location;
