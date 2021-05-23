import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const FamilyMember = ({member}) => {
  return (
    <li className='member'>
      <Link to={`/intro/5/members/${member.id}/edit/1`}>
        <img src={`/assets/avatars/${member.avatar}.svg`} />
        <p className='hide'>{member.name}</p>
      </Link>
    </li>
  );
};

FamilyMember.propTypes = {
  member: PropTypes.object
};

export default FamilyMember;
