import Immutable, { Record, List } from 'immutable'
import  {isPlainObj } from 'modes/utils/functions'
import Squad from  './Squad'

const Expert = Record({
  'image': '',
  'name': '',
  'description': '',
  'squad_rating': '',
  'cohesion_rating': '',
  'attack_defence_rating': '',
  'squad': new Squad()
})
Expert.prototype.constructor.fromJS = function (values) {
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
export default Expert
