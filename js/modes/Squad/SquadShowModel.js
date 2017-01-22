import Immutable, { Record} from 'immutable'

const SquadShowModel = Record({
  'indivPos':[
    {'position':'captain',info:null},
    {'position':'kicker',info:null},
    {'position':'wildcard',info:null}
  ], 
  'forwards':[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null], 
  'backs':[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
})

SquadShowModel.prototype.constructor.fromJS = function (values) {
 // console.log('@@@SquadShowModel.fromJS',values)
  let that = this
  let nested = Immutable.fromJS(values, function (key, value) {

    if (that.prototype[key] && that.prototype[key].constructor.prototype instanceof Record) {
      if (Array.isArray(value) || isPlainObj(value)) return that.prototype[key].constructor.fromJS(value)
      return that.prototype[key].constructor.fromJS(value.toJS())
    }
    return value
  })
  return this(nested)
}
export default SquadShowModel
