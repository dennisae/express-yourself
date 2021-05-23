import React, {PropTypes} from 'react';

const CloseConfirmation = ({title, confirmation, onSetActive, onRedirect, onConfirmation}) => {

  if (confirmation) {
    return (
      <section className='confirmationBox popup'>

        <div className='content'>

          <div className='close'>
            <button
              onClick={() => onConfirmation(false)}
              className='btn'>
              <span className='hide'>Close</span>
            </button>
          </div>

          <h3 className='title' data-before={`Stop ${title} ?`}>Stop {title} ?</h3>
          <p className='explanation'>
            You will be taken back to the activities overview.
            <br />
            Don't worry, <span className='bold'>your data will not be lost</span>!
          </p>

          <button
            onClick={() => {onSetActive(0);onConfirmation(false);onRedirect(`/activities`);}}
            className='btn'>
            <img className='icon' src='/assets/icons/check.svg' />
            <span className='text'>Stop activity</span>
          </button>
        </div>

      </section>
    );
  }

  return <div></div>;
};

CloseConfirmation.propTypes = {
  title: PropTypes.string,
  confirmation: PropTypes.bool,
  onSetActive: PropTypes.func,
  onRedirect: PropTypes.func,
  onConfirmation: PropTypes.func
};

export default CloseConfirmation;
