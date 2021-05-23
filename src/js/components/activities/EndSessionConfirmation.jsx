import React, {PropTypes} from 'react';

const EndSessionConfirmation = ({confirmation, onRedirect, onConfirmation}) => {

  if (confirmation) {
    return (
      <section className='endSession popup'>

        <div className='content'>

          <div className='close'>
            <button
              onClick={() => onConfirmation(false)}
              className='btn'>
              <span className='hide'>Close</span>
            </button>
          </div>

          <h3 className='title' data-before='Complete session?'>Complete session?</h3>
          <p className='explanation'>Completing this session will end it and <span className='bold'>automatically download your report</span>. The report contains all information about your session.</p>

          <ul className='list-inline'>
            <li>
            </li>
            <li>
              <button
                onClick={() => {onConfirmation(false);onRedirect(`/`);window.open(`/assets/download/report.pdf`);}}
                className='btn'>
                <img className='icon' src='/assets/icons/check.svg' />
                <span className='text'>Complete session</span>
              </button>
            </li>
          </ul>
        </div>

      </section>
    );
  }

  return <div></div>;
};

EndSessionConfirmation.propTypes = {
  confirmation: PropTypes.bool,
  onRedirect: PropTypes.func,
  onConfirmation: PropTypes.func
};

export default EndSessionConfirmation;
