import Immutable, { Record, List } from 'immutable'
import  {isPlainObj } from 'modes/utils/functions'
import FigureListModel from './FigureList'

const SeasonModel = Record({
  'season name': '',
  'attack': new FigureListModel(),
  'defence': new FigureListModel(),
  'kicking': new FigureListModel()

})
SeasonModel.prototype.constructor.fromJS = function (values) {
  // console.log('@@@SeasonModel.fromJS',values)
  let that = this
  let nested = Immutable.fromJS(values, function (key, value) {


    if (that.prototype[key] && that.prototype[key]  instanceof Immutable.List) {
      if (Array.isArray(value) || isPlainObj(value)) return FigureListModel.fromJS(value)
      return FigureListModel.fromJS(value.toJS())
    }
    return value
  })
  return this(nested)
}
export default SeasonModel
