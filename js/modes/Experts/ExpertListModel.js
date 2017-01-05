import { List, Record } from 'immutable'
import Expert from './One'

class ExpertList extends List {
  static fromJS (values) {
    return List.of(...values.map(it => Expert.fromJS(it)))
  }
}

export default ExpertList
