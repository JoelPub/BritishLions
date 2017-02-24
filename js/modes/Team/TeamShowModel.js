import Immutable, { Record, List} from 'immutable'

const TeamShowModel = Record({
  'indivPos':[
    {'position':'captain',info:null},
    {'position':'kicker',info:null}
  ], 
  'forwards':[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null], 
  'backs':[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
})

TeamShowModel.prototype.constructor.fromJS = function (values) {
  let that = this
  let nested = Immutable.fromJS(values, function (key, value) {
    if (that.prototype[key]) {
      return Immutable.fromJS(that.prototype[key])
    }
  })
  return this(nested)
}
export default TeamShowModel
