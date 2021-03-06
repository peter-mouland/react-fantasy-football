import React from 'react';
import Route from 'react-router-dom/Route';
import bemHelper from 'react-bem-helper';
import debug from 'debug';

import join from '../../../utils/joinPath';
import selectedItem from '../../../utils/selectedItem';
import Interstitial from '../../Interstitial/Interstitial';
import AdminList from '../AdminList/AdminList';
import AddSeason from './AddSeason';
import SeasonAdminOptions from './SeasonAdminOptions';
import Divisions from '../Divisions/Divisions';
import { ADD_SEASON, ADD_DIVISION } from './seasons.actions';

const bem = bemHelper({ name: 'seasons' });
const log = debug('kammy:Seasons.component');

export default class AdminPage extends React.Component {
  fetchExternalStats = (season, source) => {
    this.props.fetchExternalStats({ currentGW: season.currentGW, source });
  }

  addSeason = (name) => {
    this.props.addSeason(name);
  }

  addDivision = (seasonId, name) => {
    this.props.addDivision(seasonId, name);
  }

  updateSeason = (season, update) => {
    this.props.updateSeason({ seasonId: season._id, ...update });
  }

  saveSeasonStats = (season) => {
    this.props.saveSeasonStats({ seasonId: season._id });
  }

  saveGameWeekStats = (season, update) => {
    this.props.saveGameWeekStats({ seasonId: season._id, update });
  }

  render() {
    const {
      className, statsErrors = [], loading, seasons, match,
      stats, statsLoading, statsSaving, statsSaved, statsSeasonSaving, savedSeason
    } = this.props;
    const addingSeason = loading === ADD_SEASON;
    const addingDivision = loading === ADD_DIVISION;
    const seasonPath = join(match.url, ':seasonId/');
    const divisionPath = join(seasonPath, 'division/:divisionId/');

    if (!seasons) {
      return <Interstitial />;
    }

    return (
      <section { ...bem(null, null, className)} >
        <AdminList list={ seasons } type="season" secondary >
          <AddSeason
            add={ this.addSeason }
            type="Season"
            loading={ addingSeason }/>
        </AdminList>
        <Route
          path={seasonPath} render={(seasonProps) => {
            const season = selectedItem(seasonProps.match, seasons, 'seasonId');
            if (!season) return null;
            const { divisions } = season;
            return (
              <div>
                <SeasonAdminOptions
                  season={season}
                  saveSeasonStats={ (update) => this.saveSeasonStats(season, update) }
                  updateSeason={ (update) => this.updateSeason(season, update) }
                  fetchExternalStats={ (source) => this.fetchExternalStats(season, source) }
                  saveGameWeekStats={
                    (update) => this.saveGameWeekStats(season, update)
                  }
                  statsLoading={ statsLoading }
                  savedSeason={ savedSeason }
                  statsSaved={ statsSaved }
                  statsSaving={ statsSaving }
                  statsSeasonSaving={ statsSeasonSaving }
                  statsErrors={ statsErrors }
                  stats={ stats }
                />
                <AdminList
                  list={ divisions }
                  path="division"
                  secondary
                >
                  <AddSeason
                    add={ (name) => this.addDivision(season._id, name) }
                    type="division"
                    loading={ addingDivision }/>
                </AdminList>
                <Route
                  path={divisionPath}
                  render={({ match: divisionMatch }) => (
                    <Divisions
                      match={ divisionMatch }
                      season={ season }
                      divisions={ divisions }
                    />
                  )
                  }/>
              </div>
            );
          }
          }/>
      </section>
    );
  }
}
