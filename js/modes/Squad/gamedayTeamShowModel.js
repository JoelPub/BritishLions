import Immutable, { Record, List} from 'immutable'

const GamedayTeamShowModel = Record({
  'captain':null, 
  'kicker':null, 
  'forwards':new List(), 
  'backs':new List(), 
  'reserves':new List()
  })
export default GamedayTeamShowModel
