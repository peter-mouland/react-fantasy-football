/* eslint-disable no-confusing-arrow */
import { findOneUser, addUser, getUsersWithTeams } from './db/user/user.actions';
import { findPlayers, findPlayer, updatePlayers } from './db/player/player.actions';
import { updateTeam, getTeams, getTeam, assignTeamToLeague } from './db/team/team.actions';
import { getSeasons, addLeague, addSeason } from './db/season/season.actions';

const getUser = ({ email, _id }) => findOneUser({ _id, email });
const getPlayers = ({ player }) => player ? findPlayer({ player }) : findPlayers();
const getDashboard = (args, context) => (context.user)
    ? ({ message: "You're authorized to see this secret message." })
    : ({ message: 'default message' });

// The root provides the top-level API endpoints
export default {
  getPlayers,
  getSeasons,
  getTeams,
  getTeam,
  getUser,
  getUsersWithTeams,
  addSeason,
  addLeague,
  addUser,
  updatePlayers,
  updateTeam,
  assignTeamToLeague,
  getDashboard,
};
