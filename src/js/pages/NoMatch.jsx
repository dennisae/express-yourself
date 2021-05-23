import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const NoMatch = ({location}) => {
  console.log(location);

  return (
    <section className='fullPage noMatch'>

      <div className='content'>

        <div className='logo'><span className='hide'>Express yourself logo</span></div>

        <h2 className='title' data-before='What are you doing here ?'>What are you doing here ?</h2>

        <p>This page does not exist!</p>

        <Link to='/' className='btn'>
          <img className='icon' src='/assets/icons/back.svg' />
          <span className='text'>Back to home</span>
        </Link>
      </div>
    </section>
  );
};

NoMatch.propTypes = {
  location: PropTypes.object
};

export default NoMatch;
