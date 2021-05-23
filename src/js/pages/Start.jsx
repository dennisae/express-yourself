import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class Start extends Component {

  state = {}

  render() {

    const {onCreateRoom} = this.props;

    return (
      <section className='start fullPage'>
        <h2 className='logo'><span className='hide'>Express yourself logo</span></h2>

        <p>The application that assists you in analysing emotion in language.</p>

        <div className='buttons'>
          <button className='btn' onClick={() => onCreateRoom()}>
            <img className='icon' src='/assets/icons/check.svg' />
            <span className='text'>Start new session</span>
          </button>

          <p className='or'>or</p>

          <Link to='/join' className='btn existing'>
            <img className='icon' src='/assets/icons/back.svg' />
            <span className='text'>Join session</span>
          </Link>
        </div>

      </section>
    );
  }

}

Start.propTypes = {
  onCreateRoom: PropTypes.func
};

export default Start;
