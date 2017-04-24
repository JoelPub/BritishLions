import Immutable, { List, Record } from 'immutable'
import SeasonModel from './Season'

// const SeasonListModel = List(SeasonModel)
class SeasonListModel extends List {
  static fromJS (values) {
  	// if (__DEV__)console.log('@@@SeasonListModel.fromJS',values)
    return List.of(...values.map(it => SeasonModel.fromJS(it)))
  }
}

export default SeasonListModel
