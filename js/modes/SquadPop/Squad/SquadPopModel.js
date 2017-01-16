import Immutable, { Record, List } from 'immutable'
import  {isPlainObj } from 'modes/utils/functions'
import Rating from './Rating'

const SquadPopModel = Record({
  'backs': new List(),
  'captain': '',
  'forwards': new List(),
  'kicker' : '',
  'widecard': '',
  'rating': new Rating()
})

SquadPopModel.prototype.constructor.fromJS = function (values) {
 // console.log('@@@SquadPopModel.fromJS',values)
  let that = this
  let nested = Immutable.fromJS(values, function (key, value) {


    if (that.prototype[key] && that.prototype[key].constructor.prototype instanceof Record) {
      if (Array.isArray(value) || isPlainObj(value)) return that.prototype[key].constructor.fromJS(value)
      return that.prototype[key].constructor.fromJS(value.toJS())
    }
    return value
  })
  return this(nested)
}
export default SquadPopModel
