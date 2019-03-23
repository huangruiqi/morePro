const state = {
  userInfo: {},
  filter: {
    showContentTime: false,
    showContentTrend: false,
    showContentSource: false,
    showContentOther: false
  },
  filtering: {
    show: false
  },
  filterAll:{
    datetag:'all',
    neg:'all',
    carry:'全部',
    similer:'0',
    order:'timedown'
  },
  materialList:[]
}

export default state
