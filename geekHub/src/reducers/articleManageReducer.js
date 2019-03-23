const defaultState = {
  data: [{
    key: '1',
    name: 'John Brown',
    title: "程序员的生活",
    category: '前端',
    categoryTag: ['javascript','html'],
    permission: '内部',
    commentNum: 30,
    browseNmu: 25,
    likeNum: 154,
    releaseTime: '2018-10-1'
  }]
}

export default (state = defaultState, action) => {
      return state;
}