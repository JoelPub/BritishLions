import Immutable, { Record, List} from 'immutable'

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
    // console.log('key',key)
    // console.log('value',value)
    // if (that.prototype[key]) {
    //   console.log('that.prototype[key]',that.prototype[key])
    //   console.log('that.prototype[key].constructor.prototype',that.prototype[key].constructor.prototype)
    // }
    if (that.prototype[key]) {
      // console.log('is Array')
      // if (Array.isArray(value) || isPlainObj(value)) return that.prototype[key].constructor.fromJS(value)
      return Immutable.fromJS(that.prototype[key])
    }
    // return value
  })
  return this(nested)
}
export default SquadShowModel
