import Immutable, { Record} from 'immutable'

const SquadModel = Record({
  'backs': '',
  'captain': '',
  'forwards': '',
  'kicker' : '',
  'widecard': ''
})

SquadModel.prototype.constructor.format = function (values) {
 // if (__DEV__)console.log('@@@SquadModel.fromJS',values)
  for(let n in values) {
    // if (__DEV__)console.log('n',n)
    // if (__DEV__)console.log('values[n]',values[n])
    if(n==='backs'||n==='forwards') {
      values[n]=values[n].split('|').filter((v)=>v.trim()!=='')
    }
  }
  // if (__DEV__)console.log('values',values)
  return Immutable.fromJS(values)
}
export default SquadModel
