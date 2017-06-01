import { buildSchema } from 'graphql';

export default buildSchema(`
  type MinDetail {
    _id: String
    name: String
  }
  type MinPlayerDetail {
    _id: String
    name: String
    club: String
  }
  type Team {
    _id: String
    name: String
    user: MinDetail
    season: MinDetail
    league: MinDetail
    gk: MinPlayerDetail
    cbleft: MinPlayerDetail
    cbright: MinPlayerDetail
    fbleft: MinPlayerDetail
    fbright: MinPlayerDetail
    cmleft: MinPlayerDetail
    cmright: MinPlayerDetail
    wmleft: MinPlayerDetail
    wmright: MinPlayerDetail
    strleft: MinPlayerDetail
    strright: MinPlayerDetail
    sub: MinPlayerDetail
  }
  type League {
    _id: String
    name: String
    tier: Int
  }
  type Season {
    _id: String!
    name: String
    isLive: Boolean
    currentGW: Int
    leagues: [League]
  }
  type Player {
    _id: String!
    code: String
    name: String
    pos: String
    club: String
  }
  type UpdatedPlayer { 
    _id: String!
    code: String
    name: String
    pos: String
    club: String
  }
  type Stats {
    apps: Int
    subs: Int
    gls: Int
    asts: Int
    mom: Int
    cs: Int
    con: Int
    pensv: Int
    ycard: Int
    rcard: Int
  }

  type Points {
    apps: Int
    subs: Int
    gls: Int
    asts: Int
    mom: Int
    cs: Int
    con: Int
    pensv: Int
    ycard: Int
    rcard: Int
    total: Int
  }

  type GameWeek {
    stats: Stats
    points: Points
  }

  type Player {
    _id: String!
    name: String!
    code: Int
    pos: String
    club: String
    new: String
    gameWeek: GameWeek
    total: GameWeek
    pointsChange: Int
  }

  type User {
    _id: String!
    email: String!
    name: String
    defaultLeague: String
    mustChangePassword: Boolean
  }
  
  input InputMinDetail {
    _id: String
    name: String
  }
  input InputMinPlayerDetail {
    _id: String
    name: String
    club: String
    code: String
    pos: String
  }

  input TeamUpdate {
    _id: String
    name: String
    user: InputMinDetail
    season: InputMinDetail
    league: InputMinDetail
    gk: InputMinPlayerDetail
    cbleft: InputMinPlayerDetail
    cbright: InputMinPlayerDetail
    fbleft: InputMinPlayerDetail
    fbright: InputMinPlayerDetail
    cmleft: InputMinPlayerDetail
    cmright: InputMinPlayerDetail
    wmleft: InputMinPlayerDetail
    wmright: InputMinPlayerDetail
    strleft: InputMinPlayerDetail
    strright: InputMinPlayerDetail
    sub: InputMinPlayerDetail
  }

  input PlayerUpdates {
    _id: String
    club: String
    name: String
    pos: String
  }
  
  type Dashboard {
    message: String!
  }
  
  type Query {
    getTeam(teamId: String): Team
    getTeams: [Team]
    getSeasons: [Season]
    getPlayers(player: String): [Player]
    getUser(email: String, _id: String): User
    getDashboard: Dashboard
  }
  
  type Mutation {
    updatePlayers(playerUpdates: [PlayerUpdates]): [UpdatedPlayer]
    addUser(seasonId: String, leagueId: String, email: String, name: String): Team
    addLeague(seasonId: String, name: String): League
    addSeason(name: String): Season
    updateTeam(teamUpdate: TeamUpdate): Team
  }
`);

