import { List, Record } from 'immutable'
import SquadPopModel from './Squad'

class SquadPopListModel extends List {
  static fromJS (values) {
  	console.log('@@@SquadPopListModel.fromJS',values)
    return List.of(...values.map(it => SquadPopModel.fromJS(it)))
  }
}

export default SquadPopListModel
