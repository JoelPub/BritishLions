import Immutable, { Record, List} from 'immutable'

const TeamShowModel = Record({
  'indivPos':[{'position':'captain',info:null},{'position':'kicker',info:null}], 
  'forwards':[{'position':'loosehead_prop',info:null},{'position':'hooker',info:null},{'position':'tighthead_prop',info:null},{'position':'lock_4',info:null},{'position':'lock_5',info:null},{'position':'blindside',info:null},{'position':'openside',info:null},{'position':'number_8',info:null}], 
  'backs':[{'position':'scrum_half',info:null},{'position':'fly_half',info:null},{'position':'left_wing',info:null},{'position':'inside',info:null},{'position':'outside',info:null},{'position':'right',info:null},{'position':'fullback',info:null}]
})
export default TeamShowModel
