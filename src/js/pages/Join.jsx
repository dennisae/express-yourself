import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class Join extends Component {

  state = {}

  submitCode(e, code) {
    e.preventDefault();

    const {onSubmitCode} = this.props;
    const value = code.value;

    onSubmitCode(value);
  }

  renderError() {
    const {error} = this.props;

    let show = ``;
    if (error) show = `showError`;

    return (
      <div className={`error ${show}`}>
        <img src='/assets/icons/close.svg' className='icon' />
        <p className='text'>{error}</p>
      </div>
    );
  }

  render() {

    const {onRemoveError} = this.props;

    return (
      <section className='join fullPage'>

        <div className='headerBg'></div>

        <div className='joinContentWrap'>
          <h2 className='title' data-before='Join a session'>Join a session</h2>
          <p>Use the <span className='bold'>4-digit code</span> on your main device</p>

          <div className='content'>
            <form onSubmit={e => this.submitCode(e, this.code)} className='codeWrap'>

              <label htmlFor='roomCode' className='hide'>Your code</label>

              <div className='codeInput'>
                <input type='number' className='code' required min='1000' max='9999' maxLength='4' id='roomCode' ref={code => this.code = code} placeholder='1234' />
                <button type='submit' className='btn' onClick={() => onRemoveError()}>
                  <img className='icon' src='/assets/icons/check.svg' />
                </button>
              </div>
            </form>

            {this.renderError()}

          </div>
        </div>

        <div className='footer'>
          <Link to='/' className='btn backBtn' onClick={() => onRemoveError()}>
            <img className='icon' src='/assets/icons/back.svg' />
            <p className='text'>Back to menu</p>
          </Link>
        </div>
      </section>
    );
  }

}

Join.propTypes = {
  onSubmitCode: PropTypes.func,
  error: PropTypes.string,
  onRemoveError: PropTypes.func
};

export default Join;
