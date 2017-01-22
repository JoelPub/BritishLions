import Immutable, { Record, List } from 'immutable'
import  {isPlainObj } from 'modes/utils/functions'

const Rating = Record({
  'attack_defence_rating': '',
  'cohesion_rating': '',
  'fan_ranking': '',
  'overall_rating': '',
})

Rating.prototype.constructor.fromJS = function (values) {
 // console.log('@@@Rating.fromJS',values)
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

export default Rating
