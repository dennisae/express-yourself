import React, {Component, PropTypes} from 'react';

import {EndSession, EndSessionConfirmation, ActivitiesList, FamilyMembers} from '../components/activities';

class Activities extends Component {

  componentDidMount() {
    const els = document.querySelectorAll(`.activity`);

    for (let i = 0;i < els.length;i ++) {
      els[i].style.animationDelay = `${(i / 6) + .5}s`;
    }
  }

  render() {

    const {family, confirmation, completed, onConfirmation, onRedirect} = this.props;
    const {members} = family;

    return (
      <section className='activities fullPage'>

        <div className='headerBg'></div>

        <EndSessionConfirmation
          confirmation={confirmation}
          onRedirect={onRedirect}
          onConfirmation={onConfirmation}
        />

        <div className='clouds'>
          <div className='cloud'></div>
          <div className='cloud'></div>
          <div className='cloud'></div>
          <div className='cloud'></div>
          <div className='cloud'></div>
        </div>

        <h2 className='title'>Activities</h2>

        <ActivitiesList
          completed={completed}
        />

        <div className='footer'>
          <div className='content'>
            <FamilyMembers members={members} />

            <ul className='list-inline'>
              <li>
                <a href='/assets/download/report.pdf' target='_blank' className='btn'>
                  <img src='/assets/icons/download.svg' className='icon dl' />
                  <span className='hide'>Download report</span>
                </a>
              </li>
              <li>
                <EndSession
                  confirmation={confirmation}
                  onRedirect={onRedirect}
                  onConfirmation={onConfirmation}
                />
              </li>
            </ul>
          </div>
        </div>

      </section>
    );
  }
}

Activities.propTypes = {
  family: PropTypes.object,
  confirmation: PropTypes.bool,
  completed: PropTypes.array,
  onConfirmation: PropTypes.func,
  onRedirect: PropTypes.func
};

export default Activities;
