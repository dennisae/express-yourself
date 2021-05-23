import React, {PropTypes} from 'react';
import {languages} from '../../globals';

const LocationLanguages = ({location, family, onSpokenLangUpdate, checkLanguageSelected, checkFlag}) => {

  const country = languages[location];
  const {languages: familyLanguages} = family;
  const memberId = 0;

  if (location === `denied` || !location) {
    return (
      <div className='list-inline languagesDisabled'>
        <img src='/assets/icons/close.svg' className='smallIcon' />
        <p className='text'>You disabled this feature!</p>
      </div>
    );
  }

  if (!country) {
    return (
      <div className='list-inline languagesDisabled'>
        <img src='/assets/icons/close.svg' className='smallIcon' />
        <p className='text'>Your country is not added yet!</p>
      </div>
    );
  }

  return (
    <ul className='locationResult'>
      {country.map((language, i) => {
        return (
          <li className='item' key={i}>
            <input
              type='checkbox'
              className='checkbox hide'
              checked={checkLanguageSelected(familyLanguages, language)}
              value={language}
              id={language}
              onChange={() => onSpokenLangUpdate(memberId, `family`, language)}
            />
            <label htmlFor={language} className='language'>
              {checkFlag(language)}
              {language}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

LocationLanguages.propTypes = {
  location: PropTypes.string,
  family: PropTypes.object,
  onSpokenLangUpdate: PropTypes.func,
  checkLanguageSelected: PropTypes.func,
  checkFlag: PropTypes.func
};

export default LocationLanguages;
