import Immutable, { List, Record } from 'immutable'
import FigureModel from './Figure'

// const FigureListModel = List(FigureModel)
class FigureListModel extends List {
  static fromJS (values) {
  	// console.log('@@@FigureListModel.fromJS',values)
    return List.of(...values.map(it => FigureModel.fromJS(it)))
  }
}

export default FigureListModel
