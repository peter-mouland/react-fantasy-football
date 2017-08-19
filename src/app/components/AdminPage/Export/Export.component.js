import React from 'react';
import Route from 'react-router-dom/Route';
import bemHelper from 'react-bem-helper';
import debug from 'debug';

import fieldSorter from '../../../utils/field-sorter';
import Players from '../../Players/Players';
import join from '../../../utils/joinPath';
import selectedItem from '../../../utils/selectedItem';
import Interstitial from '../../Interstitial/Interstitial';
import AdminList from '../AdminList/AdminList';

const bem = bemHelper({ name: 'export' });
const log = debug('kammy:Export.component');

export default class ExportPage extends React.Component {
  fetchExternalStats = (season, source) => {
    this.props.fetchExternalStats({ currentGW: season.currentGW, source });
  };

  render() {
    const {
      className, seasons, match, teams,
    } = this.props;
    const seasonPath = join(match.url, ':seasonId/');
    let shownHeader = '';

    if (!seasons || !teams) {
      return <Interstitial />;
    }
    return (
      <section { ...bem(null, null, [className])} >
        <AdminList list={ seasons } type="season" secondary />
        <Route
          path={seasonPath} render={(seasonProps) => {
            const season = selectedItem(seasonProps.match, seasons, 'seasonId');
            if (!season) return null;
            return (
              <div className="admin-options" >
                {teams
                  .sort(fieldSorter(['division.name', 'user.name']))
                  .map((team) => {
                    const row = ([
                      shownHeader !== team.division.name && (
                        <h3 key={`h-${team.division.name + (team.user.name || team.user.email)}`}>
                          {team.division.name}
                        </h3>
                      ),
                      <Players
                        key={team.division.name + (team.user.name || team.user.email)}
                        headerRow={team.user.name || team.user.email}
                        hideOptions={true}
                        team={team}
                        type="admin"
                        showPoints
                        className="flex--full"
                      />
                    ]);
                    shownHeader = team.division.name;
                    return row;
                  })
                }
              </div>
            );
          }}/>
      </section>
    );
  }
}
