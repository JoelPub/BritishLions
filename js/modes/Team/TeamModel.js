import Immutable, { Record, List} from 'immutable'

const TeamModel = Record({
  'backs': new List(),
  'captain': '',
  'forwards': new List(),
  'kicker' : ''
})

TeamModel.prototype.constructor.fromJS = function (values) {
  let nested = Immutable.fromJS(values, function (key, value) {
    return value
  })
  return this(nested)
}
export default TeamModel
