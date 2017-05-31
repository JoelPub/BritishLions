import Immutable, { Record, List } from 'immutable'
import  {isPlainObj } from 'modes/utils/functions'
import FigureListModel from './SeasonList/Season/FigureList'

const ProfileModel = Record({
  'id': '',
  'overall_score':'',
  'performance_score': '',
  'player_consistency': '',
  'Attack': new FigureListModel(),
  'Defense': new FigureListModel(),
  'Kicking': new FigureListModel()
})
ProfileModel.prototype.constructor.fromJS = function (values) {
  // if (__DEV__)console.log('@@@ProfileModel.fromJS',values)
  let that = this
  let nested = Immutable.fromJS(values, function (key, value) {
    // if (__DEV__)console.log('key',key)
    // if (__DEV__)console.log('value',value)
    // if (__DEV__)console.log('Array.isArray(value)',Array.isArray(value))
    // if (__DEV__)console.log('is list',Immutable.List.isList(value))
    // if (that.prototype[key]) {
      // if (__DEV__)console.log('that.prototype[key]',that.prototype[key])
      // if (__DEV__)console.log('that.prototype[key] instanceof Immutable.List',(that.prototype[key]  instanceof Immutable.List) )
      // if (__DEV__)console.log('that.prototype[key].constructor',that.prototype[key].constructor)
      // if (__DEV__)console.log('that.prototype[key].constructor.prototype',that.prototype[key].constructor.prototype)
    // }

    if (that.prototype[key] && that.prototype[key]  instanceof Immutable.List) {
      // if (__DEV__)console.log('is list',key)
      if (Array.isArray(value) || isPlainObj(value)) return FigureListModel.fromJS(value)
      return FigureListModel.fromJS(value.toJS())
    }
      // if (__DEV__)console.log('is not list', key)
    return value
  })
  return this(nested)
}
export default ProfileModel
