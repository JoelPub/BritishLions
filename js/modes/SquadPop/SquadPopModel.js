import Immutable, { Record, List } from 'immutable'
import  {isPlainObj } from 'modes/utils/functions'
// import PlayerID from './Squad'
const SquadPopModel = Record({
  'backs': '',
  'captain': '',
  'forwards': '',
  'kicker' : '',
  'wildcard': '',
  'attack_defence_rating': '',
  'overall_rating': '',
  'cohesion_rating': '',
  'fan_ranking': '',
})

SquadPopModel.prototype.constructor.format = function (values) {
 // if (__DEV__)console.log('@@@SquadPopModel.fromJS',values.toJS())
 	values.forEach((value,index)=>{
	    // if (__DEV__)console.log('index',index)
	    // if (__DEV__)console.log('value',value)
 		if(index==='backs'||index==='forwards') {
	    	// if (__DEV__)console.log('JSON.parse(value)',JSON.parse(value))
 			values=values.set(index,List(JSON.parse(value)))
 		}
 	})
  // for(let n in values) {
  //   if (__DEV__)console.log('n',n)
  //   if (__DEV__)console.log('values[n]',values[n])
  //   if(n==='backs'||n==='forwards') {
  //     values[n]=JSON.parse(values[n])
  //   }
  // }
  // if (__DEV__)console.log('values.toJS()',values.toJS())
  // return Immutable.fromJS(values)
  return values
}
export default SquadPopModel
