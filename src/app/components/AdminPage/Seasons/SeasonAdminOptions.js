import React from 'react';
import PropTypes from 'prop-types';

import Toggle from '../../Toggle/Toggle';
import Interstitial from '../../Interstitial/Interstitial';
import Errors from '../../Errors/Errors';

import Players from '../../Players/Players';

class SeasonAdminOptions extends React.Component {
  static propTypes = {
    season: PropTypes.object,
  }

  toggleLive = (e) => {
    const isLive = e.target.checked;
    this.props.updateSeason({ isLive, currentGW: 1 });
  }

  fetchExternalStats = (e) => {
    e.preventDefault();
    this.props.fetchExternalStats(this.sourceEl.value);
  }

  saveGameWeekStats = (stats) => {
    this.props.saveGameWeekStats(stats);
  }

  decrementGameWeek = () => {
    this.props.updateSeason({ currentGW: this.props.season.currentGW - 1 });
  }

  incrementGameWeek = () => {
    this.props.updateSeason({ currentGW: this.props.season.currentGW + 1 });
  }

  render() {
    const {
      season, statsErrors, statsLoading, updateSeason, fetchExternalStats, saveGameWeekStats, stats, ...props // eslint-disable-line
    } = this.props;

    return (
      <div { ...props } data-test="admin-options--season">
        <div className="admin-options" >
          <Toggle
            checked={ season.isLive }
            id={`season-live--${season._id}`}
            className="admin-option"
            onChange={ this.toggleLive }
          >
            Season is Live?
          </Toggle>
          <div className="admin-option">
            Current GW:
            <span className="admin-option__value">{season.currentGW}</span>
          </div>
        </div>
        <div className="admin-options">
          <p>Game Week Actions:</p>
          <form className="admin-option__value" onSubmit={ this.fetchExternalStats }>
            <select name="stats-source" ref={(node) => { this.sourceEl = node; } }>
              <option value="external">Sky Sports</option>
              <option value="internal">Test Data</option>
            </select>
            <input type="submit" value="1. Fetch Stats" />
            { statsLoading ? <Interstitial small message="Loading stats"/> : null }
            { statsErrors.length ? <Errors errors={statsErrors} small/> : null }
          </form>
          <button
            className="admin-option__value"
            disabled={!stats}
            onClick={ () => this.saveGameWeekStats(stats) }
          >2. Save Game Week Stats</button>

          <button className="admin-option__value" onClick={ this.incrementGameWeek } disabled>
            3. Increment Game Week + Update Season Stats
          </button>
          <button className="admin-option__value" onClick={ this.decrementGameWeek } disabled>
            -1 (test admin only)
          </button>
        </div>
        { stats ?
          <div className="admin-options" >
            <section >
              <Players
                players={ (Object.keys(stats)).map((key) => stats[key]) }
                type="my-team"
                showStats
                // selectedPosition={ selectedPosition }
                // selectPlayer={ this.selectPlayer }
              />
            </section>
          </div>
          : null
        }
      </div>
    );
  }
}

export default SeasonAdminOptions;