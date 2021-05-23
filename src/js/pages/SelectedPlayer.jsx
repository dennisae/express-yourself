import React, {Component, PropTypes} from 'react';

class SelectedPlayer extends Component {

  state = {}

  render() {

    const {player} = this.props;

    return (
      <section className='fullPage selectedPlayer'>

        <div className='content'>
          <h2 className='title' data-before={`Get ready, ${player.name} !`}>Get ready, {player.name} !</h2>
          <div className='avatar'>
            <img src={`/assets/avatars/${player.avatar}.svg`} className='icon' />
          </div>
        </div>
      </section>
    );
  }

}

SelectedPlayer.propTypes = {
  player: PropTypes.object
};

export default SelectedPlayer;
