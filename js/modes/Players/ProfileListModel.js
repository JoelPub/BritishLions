import { List, Record } from 'immutable'
import ProfileModel from './Profile'

class ProfileListModel extends List {
  static fromJS (values) {
  	// console.log('@@@ProfileListModel.fromJS',values)
    return List.of(...values.map(it => ProfileModel.fromJS(it)))
  }
}

export default ProfileListModel
