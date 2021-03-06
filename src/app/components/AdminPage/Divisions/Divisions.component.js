/* eslint-disable no-confusing-arrow */
import React from 'react';
import bemHelper from 'react-bem-helper';
import Route from 'react-router-dom/Route';
import debug from 'debug';

import selectedItem from '../../../utils/selectedItem';
import { SubLink } from '../../../routes';
import joinPaths from '../../../utils/joinPath';
import TeamAdminOptions from './TeamAdminOptions';
import AssignUserToDivision from './AssignUserToDivision';

import { ASSIGN_TEAM_TO_DIVISION } from './division.actions';

const bem = bemHelper({ name: 'divisions' });
const bem2 = bemHelper({ name: 'admin-options' });
const log = debug('kammy:admin/Divisions');

export default class Divisions extends React.Component {
  updateTeam = (team) => {
    this.props.updateTeam(team);
  }

  assignUser = (divisionId, form) => {
    this.props.assignTeamToDivision({ divisionId, divisionName: this.divisionName, ...form });
  }

  render() {
    const {
      loading, season, divisions, seasonUsers = [], match, updatingUserTeam
    } = this.props;
    const assigningUserToDivision = loading === ASSIGN_TEAM_TO_DIVISION;

    const division = selectedItem(match, divisions, 'divisionId');
    if (!division) return null;
    this.divisionName = division.name;
    // todo pull this out into a reducer
    const teams = seasonUsers.reduce((prev, curr) => prev.concat(curr.teams), []);
    const divisionTeams = teams.filter((team) => team.division._id === division._id);
    return (
      <div
        {...bem(null, 'top', 'admin-options') }
        data-test="admin-options--division"
      >
        <div className="admin-option">
          <ul className="simple-list">
            { divisionTeams
              .sort((teamA, teamB) => teamA.user.name < teamB.user.name ? -1 : 1)
              .map((team) => {
                const teamPath = joinPaths(match.url, 'team', team._id);
                return (
                  <li key={team._id}>
                    {team.name}
                    <SubLink { ...bem2('text') } to={teamPath}>
                      {team.user.name}
                    </SubLink>
                    <Route
                      path={teamPath} render={() => (
                        <TeamAdminOptions
                          divisionTeams={ divisionTeams }
                          updatingUserTeam={ updatingUserTeam }
                          team={ team }
                          saveUpdates={ this.updateTeam }
                        />
                      )}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="admin-option admin-option__btn">
          <AssignUserToDivision
            assignUser={ (form) => this.assignUser(division._id, form) }
            season={ season }
            division={ division }
            loading={ assigningUserToDivision }
            teams={ teams }
            users={ seasonUsers }
          />
        </div>
      </div>
    );
  }
}
