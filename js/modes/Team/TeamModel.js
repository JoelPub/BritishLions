import Immutable, { Record} from 'immutable'

const TeamModel = Record({
  'backs': '',
  'captain': '',
  'forwards': '',
  'kicker' : ''
})

TeamModel.prototype.constructor.format = function (values) {
  for(let n in values) {
    if(n==='backs'||n==='forwards') {
      values[n]=values[n].split('|').filter((v)=>v.trim()!=='')
    }
  }
  return Immutable.fromJS(values)
}
export default TeamModel
