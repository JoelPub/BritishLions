import Immutable, { Record, List} from 'immutable'

const OppositionSquadShowModel = Record({
  'indivPos':[
    {'position':'captain',info:null},
    {'position':'kicker',info:null},
  ], 
  'forwards':new List(), 
  'backs':new List()
  })
export default OppositionSquadShowModel
