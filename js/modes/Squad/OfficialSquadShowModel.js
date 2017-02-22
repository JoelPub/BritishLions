import Immutable, { Record, List} from 'immutable'

const OfficialSquadShowModel = Record({
  'indivPos':[
    {'position':'coach',info:null},
    {'position':'captain',info:null},
  ], 
  'forwards':[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null], 
  'backs':[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
})
export default OfficialSquadShowModel
