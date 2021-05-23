import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {SpokenLanguages, FoundLanguages} from '../../components';
import {languages as allLanguages} from '../../globals';

const MemberLanguages = ({step, member, search, onSpokenLangUpdate, onSearchLangUpdate, onMemberCompleted}) => {

  const {id: memberId, name, languages} = member;

  return (
    <section className='intro memberLanguages fullPage'>

      <div className='headerBg'></div>
      <img className='headerBgExtra' src='/assets/headers/familyLanguages/talk.svg' />

      <div className='content'>
        <h2 className='title' data-before={`${name} speaks...`}>{name} speaks...</h2>

        <div className='selectLanguages'>
          <SpokenLanguages
            member={member}
            onSpokenLangUpdate={onSpokenLangUpdate}
            checkLanguageSelected={(memberLanguages, language) => checkLanguageSelected(memberLanguages, language)}
            checkFlag={language => checkFlag(language)}
          />

          <form onSubmit={e => e.preventDefault()}>
            <div className='searchLanguage'>
              <label htmlFor='languageSearch' className='hide'>Search for a language</label>
              <input
                type='text'
                className='search'
                id='languageSearch'
                placeholder='Search for a language'
                ref={searchLanguage => this.searchLanguage = searchLanguage}
                onChange={() => onSearchLangUpdate(this.searchLanguage.value)}
              />

              <FoundLanguages
                found={search}
                member={member}
                searchLanguage={checkSeachLanguage()}
                onSpokenLangUpdate={onSpokenLangUpdate}
                checkLanguageSelected={(familyLanguages, language) => checkLanguageSelected(familyLanguages, language)}
                checkFlag={language => checkFlag(language)}
              />

            </div>
          </form>
        </div>

        <div className='nextWrap'>
          {renderDone(name, step, memberId, languages, onMemberCompleted)}
        </div>
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

const renderDone = (name, step, memberId, languages, onMemberCompleted) => {

  if (languages.length === 0) return;

  return (
    <Link
      to={`/intro/${step}`}
      className='btn'
      onClick={() => onMemberCompleted(memberId)}>
      <img className='icon' src='/assets/icons/check.svg' />
      <span className='text'>{`${name} is done!`}</span>
    </Link>
  );
};

const checkSeachLanguage = () => {
  if (this.searchLanguage) return this.searchLanguage.value;
};

const checkLanguageSelected = (languages, language) => {
  const index = languages.indexOf(language);
  if (index > - 1) return true;
  return false;
};

MemberLanguages.propTypes = {
  step: PropTypes.number,
  member: PropTypes.object,
  search: PropTypes.array,
  onSpokenLangUpdate: PropTypes.func,
  checkLanguageSelected: PropTypes.func,
  onSearchLangUpdate: PropTypes.func,
  onMemberCompleted: PropTypes.func
};

export default MemberLanguages;
