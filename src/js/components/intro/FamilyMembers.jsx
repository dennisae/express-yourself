import React, {Component, PropTypes} from 'react';
import {Previous, Next, FamilyMember} from '../../components';

class FamilyMembers extends Component {

  componentWillMount() {
    const {familyMembers, onMembersUpdate} = this.props;
    if (familyMembers.length > 0) return;
    onMembersUpdate(true);
  }

  render() {

    const {step, familyName, familyMembers, onIntroStepUpdate, onMembersUpdate} = this.props;

    return (
      <section className='intro familyMembers fullPage'>

        <div className='headerBg'></div>
        <img className='headerBgExtra' src='/assets/headers/familyMembers/family.svg' />

        <div className='content'>
          <h2 className='title' data-before={`${familyName} members`}>{familyName} members</h2>

          <div className='membersList'>
            <button className='btn iconBtn memberBtn' onClick={() => onMembersUpdate(false)}>
              <img src='/assets/icons/delete_2.svg' className='icon' />
              <span className='hide'>Remove</span>
            </button>
            <ul className='list-inline'>
              {familyMembers.map((member, i) => <FamilyMember key={i} member={member} link={false} step={step} />)}
            </ul>
            <button className='btn iconBtn memberBtn' onClick={() => onMembersUpdate(true)}>
              <img src='/assets/icons/add_2.svg' className='icon' />
              <span className='hide'>Add</span>
            </button>
          </div>

          <ul className='list-inline buttons'>
            <li>
              <Previous step={step} text='Languages' onIntroStepUpdate={onIntroStepUpdate} />
            </li>
            <li>
              {renderNext(step, onIntroStepUpdate, familyMembers)}
            </li>
          </ul>
        </div>

      </section>
    );
  }
}

const renderNext = (step, onIntroStepUpdate, familyMembers) => {

  const members = familyMembers.length > 1 ? `members` : `member`;

  return (
    <Next step={step} onIntroStepUpdate={onIntroStepUpdate} text={`${familyMembers.length} ${members}, check!`} />
  );
};

FamilyMembers.propTypes = {
  step: PropTypes.number,
  familyName: PropTypes.string,
  familyMembers: PropTypes.array,
  onIntroStepUpdate: PropTypes.func,
  onMembersUpdate: PropTypes.func
};

export default FamilyMembers;
