import Immutable, { Record, List} from 'immutable'

const FixtureInfoModel = Record({
    'id': '',
    'date': '',
    'time': '',
    'title': '',
    'opposition': '',
    'opposition_image': '',
    'stadium': '',
    'stadium_location': '',
    'stadium_time': '',
    'game_status': '',

    'pre': null,
	'live': null,
    'post': {
		'description': '',
		'statics': {
			'opposition': {
				'score': 0,
				'tries': 0,
				'conversions': 0,
				'penalties': 0,
				'dropped_goals': 0,
				'possession': 0,
				'breaks': 0,
				'metres': 0,
				'scrums': 0,
				'lione_outs': 0,
				'pen_con': 0
			},
			'bil': {
				'score': 0,
				'tries': 0,
				'conversions': 0,
				'penalties': 0,
				'dropped_goals': 0,
				'possession': 0,
				'breaks': 0,
				'metres': 0,
				'scrums': 0,
				'lione_outs': 0,
				'pen_con': 0
			}
		}
	}
})

FixtureInfoModel.prototype.constructor.fromJS = function (values) {
  let nested = Immutable.fromJS(values, function (key, value) {
    return value
  })
  return this(nested)
}
export default FixtureInfoModel
