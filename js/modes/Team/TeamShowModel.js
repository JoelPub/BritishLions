import Immutable, { Record, List} from 'immutable'

const TeamShowModel = Record({
  'indivPos':[{'position':'captain',info:null},{'position':'kicker',info:null}], 
  'forwards':[{'position':'loosehead prop',info:null},{'position':'hooker',info:null},{'position':'tighthead prop',info:null},{'position':'number-4 lock',info:null},{'position':'number-5 lock',info:null},{'position':'blindside-flanker',info:null},{'position':'openside-flanker',info:null},{'position':'number-8',info:null}], 
  'backs':[{'position':'scrum-half',info:null},{'position':'fly-half',info:null},{'position':'left-wing',info:null},{'position':'inside-centre',info:null},{'position':'outside-centre',info:null},{'position':'right-wing',info:null},{'position':'fullback',info:null}]
})
export default TeamShowModel
