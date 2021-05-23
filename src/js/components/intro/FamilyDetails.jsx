import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Previous, FamilyMember} from '../../components';

const FamilyDetails = ({step, familyName, familyMembers, onIntroStepUpdate, onIntroCompleted}) => {

  return (
    <section className='intro familyDetails fullPage'>

      <div className='headerBg'></div>
      <img className='headerBgExtra' src='/assets/headers/familyDetails/family.svg' />

      <div className='content'>
        <h2 className='title' data-before={`The ${familyName} family`}>The {familyName} family</h2>

        <div className='membersList'>
          <ul className='list-inline'>
            {familyMembers.map((member, i) => <FamilyMember key={i} member={member} link={true} step={step} />)}
          </ul>
        </div>

        <ul className='list-inline buttons'>
          <li>
            <Previous step={step} text='Family members' onIntroStepUpdate={onIntroStepUpdate} />
          </li>
          <li>
            {renderNext(onIntroCompleted)}
          </li>
        </ul>
      </div>

    </section>
  );
};

const renderNext = onIntroCompleted => {

  const done = onIntroCompleted();

  if (!done) return;

  return (
    <Link to='/activities' className='btn'>
      <img className='icon' src='/assets/icons/check.svg' />
      <span className='text'>Time for activities!</span>
    </Link>
  );
};

FamilyDetails.propTypes = {
  step: PropTypes.number,
  familyName: PropTypes.string,
  familyMembers: PropTypes.array,
  onIntroStepUpdate: PropTypes.func,
  onIntroCompleted: PropTypes.func
};

export default FamilyDetails;
