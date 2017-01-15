import Immutable, { Record, List } from 'immutable'
import  {isPlainObj } from 'modes/utils/functions'
import SeasonListModel from './SeasonList'
import SeasonModel from './SeasonList/Season'

const ProfileModel = Record({
  'player_id': '',
  'performance_score': '',
  'player_consistency': '',
  'seasons': new SeasonListModel()
})
ProfileModel.prototype.constructor.fromJS = function (values) {
  console.log('@@@ProfileModel.fromJS',values)
  let that = this
  let nested = Immutable.fromJS(values, function (key, value) {
    // console.log('key',key)
    // console.log('value',value)
    // console.log('Array.isArray(value)',Array.isArray(value))
    // console.log('is list',Immutable.List.isList(value))
    if (that.prototype[key]) {
      // console.log('that.prototype[key]',that.prototype[key])
      // console.log('that.prototype[key] instanceof Immutable.List',(that.prototype[key]  instanceof Immutable.List) )
      // console.log('that.prototype[key].constructor',that.prototype[key].constructor)
      // console.log('that.prototype[key].constructor.prototype',that.prototype[key].constructor.prototype)
    }

    if (that.prototype[key] && that.prototype[key]  instanceof Immutable.List) {
      // console.log('is list',key)
      if (Array.isArray(value) || isPlainObj(value)) return SeasonListModel.fromJS(value)
      return SeasonListModel.fromJS(value.toJS())
    }
      // console.log('is not list', key)
    return value
  })
  return this(nested)
}
export default ProfileModel
