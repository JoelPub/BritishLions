import Immutable, { Record, List} from 'immutable'

const FixtureInfoModel = Record({
  'id': '',
  'date': '',
  'time': '',
  'title': '',
  'opposition': '',
  'opposition_image': '',
  'banner': '',
  'stadium': '',
  'stadiumlocation': '',
  'stadiumtime': '',
  'description': '',
  'pre': null,
  'live': null,
  'post': null
})

FixtureInfoModel.prototype.constructor.fromJS = function (values) {
  let nested = Immutable.fromJS(values, function (key, value) {
    return value
  })
  return this(nested)
}
export default FixtureInfoModel
