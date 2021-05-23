import React, {PropTypes} from 'react';
import {FamilyMember} from './';

const FamilyMembers = ({members}) => {
  return (
    <section className='members'>

      <h3 className='hide'>The family</h3>

      <ul className='list-inline'>
        {members.map((member, i) => <FamilyMember key={i} member={member} />)}
      </ul>

    </section>
  );
};

FamilyMembers.propTypes = {
  members: PropTypes.array
};

export default FamilyMembers;
