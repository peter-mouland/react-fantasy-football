import debug from 'debug';
import mongoose from 'mongoose';

const Team = mongoose.model('Team');
const ObjectId = mongoose.Types.ObjectId;

const log = debug('ff:db/team.actions');

export const saveNewTeam = (teamData) => {
  const newTeam = new Team(teamData);
  return newTeam.save();
};

export const getTeams = (search = {}) => Team.find(search).exec();

export const getTeam = ({ teamId }, context) => {
  if (!teamId) {
    log({ _id: new ObjectId(context.user._id) });
    return Team.findOne({ 'user._id': new ObjectId(context.user._id) }).exec();
  }
  return Team.findById(teamId).exec();
};

export const updateTeamById = (_id, teamUpdate) =>
  Team.findByIdAndUpdate(_id, teamUpdate, { new: true }).exec();

function clean(obj) { // remove null's
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (!val) return;
    newObj[key] = val;
  });

  return newObj;
}

export const updateTeam = ({ teamUpdate }) => {
  const update = clean({
    gk: teamUpdate.gk,
    cbleft: teamUpdate.cbleft,
    cbright: teamUpdate.cbright,
    fbleft: teamUpdate.fbleft,
    fbright: teamUpdate.fbright,
    cmleft: teamUpdate.cmleft,
    cmright: teamUpdate.cmright,
    wmleft: teamUpdate.wmleft,
    wmright: teamUpdate.wmright,
    strleft: teamUpdate.strleft,
    strright: teamUpdate.strright,
    sub: teamUpdate.sub,
  });
  return updateTeamById(teamUpdate._id, { $set: update });
};

