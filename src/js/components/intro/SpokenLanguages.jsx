import React, {PropTypes} from 'react';

const SpokenLanguages = ({family, member, onSpokenLangUpdate, checkLanguageSelected, checkFlag}) => {

  let languages = [];
  let spokenLangUpdate = ``;

  let memberId = 0;

  if (family) {
    languages = family.languages;
    spokenLangUpdate = `family`;
  } else if (member) {
    memberId = member.id;
    languages = member.languages;
    spokenLangUpdate = `member`;
  }

  if (languages.length === 0) return <p className='selectedLanguages'>Tap on a language to select it <img src='/assets/avatars/pig.svg' className='smiley' alt=':)' /></p>;

  return (
    <ul className='list-inline selectedLanguages'>
      {languages.map((lang, i) => {
        return (
          <li className='item' key={i}>
            <input
              type='checkbox'
              className='checkbox hide'
              checked={checkLanguageSelected(languages, lang)}
              value={lang}
              id={lang}
              onChange={() => onSpokenLangUpdate(memberId, spokenLangUpdate, lang)}
            />
            <label htmlFor={lang} className='language'>
              {checkFlag(lang)}
              {lang}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

SpokenLanguages.propTypes = {
  family: PropTypes.object,
  member: PropTypes.object,
  onSpokenLangUpdate: PropTypes.func,
  checkLanguageSelected: PropTypes.func,
  checkFlag: PropTypes.func
};

export default SpokenLanguages;
