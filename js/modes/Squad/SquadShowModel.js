import Immutable, { Record} from 'immutable'

const SquadShowModel = Record({
  'indivPos':[
    {'position':'captain',info:null},
    {'position':'kicker',info:null},
    {'position':'widecard',info:null}
  ], 
  'forwards':[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null], 
  'backs':[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
})

SquadShowModel.prototype.constructor.fromJS = function (values) {
 console.log('@@@SquadShowModel.fromJS',values)
  let that = this
  let nested = Immutable.fromJS(values, function (key, value) {

    console.log('key',key)
    console.log('value',value)
    console.log('Array.isArray(value)',Array.isArray(value))
    console.log('is list',Immutable.List.isList(value))
    if (that.prototype[key]) {
      console.log('that.prototype[key]',that.prototype[key])
      console.log('that.prototype[key] instanceof Immutable.List',(that.prototype[key]  instanceof Immutable.List) )
      console.log('that.prototype[key].constructor',that.prototype[key].constructor)
      console.log('that.prototype[key].constructor.prototype',that.prototype[key].constructor.prototype)
    }

    if (that.prototype[key] && that.prototype[key].constructor.prototype instanceof Record) {
      if (Array.isArray(value) || isPlainObj(value)) return that.prototype[key].constructor.fromJS(value)
      return that.prototype[key].constructor.fromJS(value.toJS())
    }
    return value
  })
  return this(nested)
}
export default SquadShowModel
