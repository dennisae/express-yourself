import React, {PropTypes} from 'react';

import {languages as allLanguages} from '../../globals';
import {Previous, Next, FoundLanguages, SpokenLanguages, LocationLanguages} from '../../components';

const FamilyLanguages = ({step, family, location, search, onIntroStepUpdate, onSpokenLangUpdate, onSearchLangUpdate}) => {
  return (
    <section className='intro familyLanguages fullPage'>

      <div className='headerBg'></div>
      <img className='headerBgExtra' src='/assets/headers/familyLanguages/talk.svg' />

      <div className='content'>
        <h2 className='title'>Family languages</h2>

        <form onSubmit={e => e.preventDefault()}>

          <SpokenLanguages
            family={family}
            onSpokenLangUpdate={onSpokenLangUpdate}
            checkLanguageSelected={(familyLanguages, language) => checkLanguageSelected(familyLanguages, language)}
            checkFlag={language => checkFlag(language)}
          />

          <div className='selectLanguages'>
            <div className='mostSpokenLanguage'>
              <h3 className='title'>Most spoken languages</h3>

              <LocationLanguages
                location={location}
                family={family}
                onSpokenLangUpdate={onSpokenLangUpdate}
                checkLanguageSelected={(familyLanguages, language) => checkLanguageSelected(familyLanguages, language)}
                checkFlag={language => checkFlag(language)}
              />
            </div>

            <div className='searchLanguage'>
              <label htmlFor='languageSearch' className='hide'>Search for a language</label>
              <input
                type='text'
                maxLength='15'
                className='search'
                id='languageSearch'
                placeholder='Type your language'
                ref={searchLanguage => this.searchLanguage = searchLanguage}
                onChange={() => onSearchLangUpdate(this.searchLanguage.value)}
              />

              <FoundLanguages
                found={search}
                family={family}
                searchLanguage={checkSeachLanguage()}
                onSpokenLangUpdate={onSpokenLangUpdate}
                checkLanguageSelected={(familyLanguages, language) => checkLanguageSelected(familyLanguages, language)}
                checkFlag={language => checkFlag(language)}
              />
            </div>
          </div>

          <ul className='list-inline buttons'>

            <li>
              <Previous step={step} text='Location' onIntroStepUpdate={onIntroStepUpdate} />
            </li>

            {renderNext(step, onIntroStepUpdate, family)}

          </ul>

          <input type='submit' className='hide' />

        </form>
      </div>
    </section>
  );
};

const checkFlag = language => {
  const lang = allLanguages.all.find(l => l.name === language);

  let img = ``;
  if (lang.flag) img = lang.flag;
  else img = `global`;

  return <img src={`/assets/icons/flags/${img}.svg`} className='flag' />;
};

const checkSeachLanguage = () => {
  if (this.searchLanguage) return this.searchLanguage.value;
  return ``;
};

const renderNext = (step, onIntroStepUpdate, family) => {
  const {languages} = family;

  if (languages.length === 0) return;

  const word = languages.length === 1 ? `language` : `languages`;
  return <li><Next step={step} onIntroStepUpdate={onIntroStepUpdate} text={`${languages.length} ${word}, check!`} /></li>;
};

const checkLanguageSelected = (languages, language) => {
  const index = languages.indexOf(language);
  if (index > - 1) return true;
  return false;
};

FamilyLanguages.propTypes = {
  step: PropTypes.number,
  onIntroStepUpdate: PropTypes.func,
  onSpokenLangUpdate: PropTypes.func,
  onSearchLangUpdate: PropTypes.func,
  family: PropTypes.object,
  location: PropTypes.string,
  search: PropTypes.array
};

export default FamilyLanguages;
