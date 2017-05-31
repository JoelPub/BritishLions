import Immutable, { Record, List} from 'immutable'

const OfficialSquadShowModel = Record({
  'indivPos':[
    {'position':'coach',info:null},
    {'position':'captain',info:null},
  ], 
  'forwards':new List(), 
  'backs':new List(), 
  'coachstaffs':new List()
})
export default OfficialSquadShowModel
