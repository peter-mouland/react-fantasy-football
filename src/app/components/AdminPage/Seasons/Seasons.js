import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SeasonsComponent from './Seasons.component';
import {
  fetchSeasons, updateSeason, addSeason, addDivision, fetchUsersWithTeams
} from './seasons.actions';
import { fetchExternalStats, saveGameWeekStats, saveSeasonStats } from './stats.actions';

class AdminPage extends React.Component {
  static needs = [fetchSeasons];

  componentDidMount() {
    if (!this.props.seasons) {
      this.props.fetchSeasons();
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    const { router: { route: { match } } } = this.context;
    return (<SeasonsComponent match={ match } { ...this.props } />);
  }
}

function mapStateToProps(state) {
  return {
    seasonUsers: state.seasons.seasonUsers,
    seasons: state.seasons.data,
    stats: state.stats.data,
    statsErrors: state.stats.errors,
    statsLoading: state.stats.loading,
    statsSaving: state.stats.saving,
    statsSaved: state.stats.saved,
    seasonAdded: state.seasons.seasonAdded,
    divisionAdded: state.seasons.divisionAdded,
    loading: state.promiseState.loading,
    errors: state.promiseState.errors,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchUsersWithTeams,
    fetchSeasons,
    fetchExternalStats,
    addSeason,
    addDivision,
    updateSeason,
    saveSeasonStats,
    saveGameWeekStats,
  }
)(AdminPage);
