import React, {PropTypes} from 'react';

const FoundLanguages = ({found, family, member, searchLanguage, onSpokenLangUpdate, checkLanguageSelected, checkFlag}) => {

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

  if (searchLanguage) {
    if (found.length === 0 && searchLanguage.length > 0) return <p className='searchResult'>Oops, no results <img src='/assets/icons/pig_sad.svg' className='smiley' alt=':(' /></p>;
  }

  if (found.length === 0) return <p className='searchResult'>Type to find your language!</p>;

  return (
    <ul className='searchResult'>
      {found.map((language, i) => {
        return (
          <li className='item' key={i}>
            <input
              type='checkbox'
              className='checkbox hide'
              checked={checkLanguageSelected(languages, language)}
              value={language}
              id={language}
              onChange={() => onSpokenLangUpdate(memberId, spokenLangUpdate, language)}
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

FoundLanguages.propTypes = {
  found: PropTypes.array,
  family: PropTypes.object,
  member: PropTypes.object,
  searchLanguage: PropTypes.string,
  onSpokenLangUpdate: PropTypes.func,
  checkLanguageSelected: PropTypes.func,
  checkFlag: PropTypes.func
};

export default FoundLanguages;
