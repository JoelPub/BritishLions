import Immutable, { Record, List} from 'immutable'

const MatchManShowModel = Record({
  'forwards':new List(), 
  'backs':new List(), 
  'replacements':new List(),
  })
export default MatchManShowModel
