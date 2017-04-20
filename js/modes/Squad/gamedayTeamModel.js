import Immutable, { Record} from 'immutable'

const GamedayTeamModel = Record({
  'backs': [],
  'captain': '',
  'forwards': [],
  'reserves':[]
})

export default GamedayTeamModel