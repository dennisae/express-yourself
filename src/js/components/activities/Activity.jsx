import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Activity = ({i, activity, completed}) => {

  const id = i + 1;

  return (
    <li className={`activity ${activity.name}`} style={{background: activity.color}}>
      <Link to={`/activities/${id}/details`} className='infoBtn'>
        <p className='text'>i</p>
        <span className='hide'>Info</span>
      </Link>

      <Link to={`/activities/${id}/steps/1`} className='activityLink'>

        {renderCompleted(id, completed)}

        <div className='cover'>
          <img src={`/assets/activities/covers/${activity.cover}.svg`} />
        </div>
        <p className='activityTitle'><span className='text' style={{color: activity.color}}>{activity.title}</span></p>
      </Link>
    </li>
  );
};

const renderCompleted = (id, completed) => {
  return completed.map((activityId, i) => {
    if (activityId === id) return (
      <div className='checkedBtn' key={i}>
        <img src='/assets/icons/check.svg' className='icon' />
        <p className='hide'>Done</p>
      </div>
    );
  });
};

Activity.propTypes = {
  i: PropTypes.number,
  activity: PropTypes.object,
  completed: PropTypes.array
};

export default Activity;
