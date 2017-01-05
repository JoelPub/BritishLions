import { List, Record } from 'immutable'

const ListState = Record({
  data: new List(),
  pageIndex: 0,
  pageSize: 0,
  totalCount: 0
})
export default ListState
