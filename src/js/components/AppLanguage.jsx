import React, {Component, PropTypes} from 'react';
import {languages as allLanguages} from '../globals';

class AppLanguage extends Component {

  state = {
    show: false
  }

  checkFlag(language) {

    const lang = allLanguages.all.find(l => l.name === language);

    let img = ``;
    if (lang.flag) img = lang.flag;
    else img = `global`;

    return <img src={`/assets/icons/flags/${img}.svg`} className='flag' />;
  }

  toggleLanguages() {
    let {show} = this.state;

    show = show ? false : true;

    const langs = document.querySelector(`.all`);
    if (!langs) return;

    if (show)  langs.style.top = `1rem`;
    else langs.style.top = `-24rem`;

    this.setState({show});
  }

  render() {

    const {language} = this.props;

    return (
      <div className='appLanguages'>

        <div className='current' onClick={() => this.toggleLanguages()}>
          {this.checkFlag(language)}
          <p className='hide'>{language}</p>
        </div>

        <ul className='all'>
          <li className='language'>
            {this.checkFlag(`English`)}
            <p className='text hide'>English</p>
          </li>
          <li className='language'>
            {this.checkFlag(`French`)}
            <p className='text hide'>French</p>
          </li>
          <li className='language'>
            {this.checkFlag(`Dutch`)}
            <p className='text hide'>Dutch</p>
          </li>
          <li className='language'>
            {this.checkFlag(`German`)}
            <p className='text hide'>German</p>
          </li>
        </ul>

      </div>
    );
  }

}

AppLanguage.propTypes = {
  language: PropTypes.string
};

export default AppLanguage;
