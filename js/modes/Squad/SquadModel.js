import Immutable, { Record} from 'immutable'

const SquadModel = Record({
  'backs': '',
  'captain': '',
  'forwards': '',
  'kicker' : '',
  'wildcard': ''
})

SquadModel.prototype.constructor.format = function (values) {
 // console.log('@@@SquadModel.fromJS',values)
  for(let n in values) {
    // console.log('n',n)
    // console.log('values[n]',values[n])
    if(n==='backs'||n==='forwards') {
      values[n]=values[n].split('|').filter((v)=>v.trim()!=='')
    }
  }
  // console.log('values',values)
  return Immutable.fromJS(values)
}
export default SquadModel
