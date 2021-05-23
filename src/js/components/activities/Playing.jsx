import React, {PropTypes} from 'react';

const Playing = ({player}) => {

  const {name, avatar} = player;

  return (
    <div className='playing'>
      <p className='btn name'><span className='bold'>{name}</span>&nbsp;is playing</p>
      <img src={`/assets/avatars/${avatar}.svg`} className='avatar' />
    </div>
  );
};

Playing.propTypes = {
  player: PropTypes.object
};

export default Playing;
