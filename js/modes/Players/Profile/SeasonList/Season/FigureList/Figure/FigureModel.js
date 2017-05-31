import Immutable, { Record, List } from 'immutable'
import  {isPlainObj } from 'modes/utils/functions'

const FigureModel = Record({
  'average': '',
  'name': '',
  'value': ''

})
FigureModel.prototype.constructor.fromJS = function (values) {
 // if (__DEV__)console.log('@@@FigureModel.fromJS',values)
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

export default FigureModel
