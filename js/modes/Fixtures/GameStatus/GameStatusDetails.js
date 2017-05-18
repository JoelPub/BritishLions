import Immutable, { Record, List} from 'immutable'

const GameStatusDetailsModel = Record({
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
            'line_outs': 0,
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
            'line_outs': 0,
            'pen_con': 0
        }
    }
})

GameStatusDetailsModel.prototype.constructor.fromJS = function (values) {
  let nested = Immutable.fromJS(values, function (key, value) {
    return value
  })
  return this(nested)
}
export default GameStatusDetailsModel
