const defaultState = {
  data:[{
    key: '1',
    name: 'John Brown',
    title: "程序员的生活",
    category: '前端',
    categoryTag: ['javascript','html'],
    permission: '内部',
    downloadNum: 30,
    browseNmu: 25,
    size: '32.22kb',
  }]
}

export default (state = defaultState, action) => {
      return state;
}