import Immutable, { Record, List } from 'immutable'
import  {isPlainObj } from 'modes/utils/functions'
const SquadModel = Record({
  'captain': '',
  'kicker': '',
  'widecard': '',
  'forwards': new List(),
  'backs': new List ()
})
SquadModel.prototype.constructor.fromJS = function (values) {
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

export default SquadModel
