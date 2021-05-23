import React, {Component, PropTypes} from 'react';

class Subject extends Component {

  state = {
    subject: ``
  }

  onSubjectSelect(e, subject) {
    e.preventDefault();

    const {id, step, onSubjectSubmit} = this.props;
    onSubjectSubmit(id, step, subject);
  }

  renderNext() {
    const {subject} = this.state;
    if (!subject) return;

    return (
      <button className='btn'>
        <img className='icon' src={`/assets/icons/check.svg`} />
        <span className='text'>Start drawing</span>
      </button>
    );
  }

  updateSubject(subject) {
    this.setState({subject: subject.value});
  }

  render() {

    const {familyLanguages} = this.props;

    return (
      <section className='fullPage subject'>

        <div className='headerBg'></div>

        <div className='titleWrap'>
          <h2 className='title' data-before='Choose a subject'>Choose a subject</h2>
        </div>

        <div className='content'>

          <ul className='proposedSubjects'>
            {familyLanguages.map((language, i) => {
              return (
                <li key={i}>
                  <button className='btn proposedSubject' onClick={e => this.onSubjectSelect(e, language)}>{language}</button>
                </li>
              );
            })}
          </ul>

          <p className='or'>or</p>

          <form className='customSubject' onSubmit={e => this.onSubjectSelect(e, this.subject.value)}>
            <label className='hide' htmlFor='customSubject'>Custom subject</label>
            <input type='text' className='input' maxLength='30' id='customSubject' placeholder='Your own subject' ref={subject => this.subject = subject} onChange={() => this.updateSubject(this.subject)} />

            <input type='submit' className='hide' />

            <div className='submitSubject'>
              {this.renderNext()}
            </div>
          </form>
        </div>
      </section>
    );
  }

}

Subject.propTypes = {
  id: PropTypes.number,
  step: PropTypes.number,
  familyLanguages: PropTypes.array,
  onSubjectSubmit: PropTypes.func
};

export default Subject;
