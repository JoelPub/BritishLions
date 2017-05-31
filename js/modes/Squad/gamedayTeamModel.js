import Immutable, { Record} from 'immutable'

const GamedayTeamModel = Record({
  'backs': [],
  'captain': '',
  'kicker': '',
  'forwards': [],
  'reserves':[]
})

export default GamedayTeamModel