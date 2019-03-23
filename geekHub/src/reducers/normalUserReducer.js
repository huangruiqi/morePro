const defaultState = {
  data: [{
    key: '1',
    name: 'John Brown1',
    email: "235621618@qq.com",
    phone: 17453344318,
    loginTime: '2011-04-06',
    articlesNum: 324,
    resourceNum: 30,
    internalPerson: "是",
  },{
    key: '2',
    name: 'John Brown2',
    email: "235621618@qq.com",
    phone: 17453344318,
    loginTime: 2011,
    articlesNum: 324,
    resourceNum: 30,
    internalPerson: "是",
  },{
    key: '3',
    name: 'John Brown3',
    email: "235621618@qq.com",
    phone: 17453344318,
    loginTime: 2011,
    articlesNum: 324,
    resourceNum: 30,
    internalPerson: "是",
  },{
    key: '4',
    name: 'John Brown4',
    email: "235621618@qq.com",
    phone: 17453344318,
    loginTime: 2011,
    articlesNum: 324,
    resourceNum: 30,
    internalPerson: "是",
  },{
    key: '5',
    name: 'John Brown5',
    email: "235621618@qq.com",
    phone: 17453344318,
    loginTime: 2011,
    articlesNum: 324,
    resourceNum: 30,
    internalPerson: "是",
  },{
    key: '6',
    name: 'John Brown6',
    email: "235621618@qq.com",
    phone: 17453344318,
    loginTime: 2011,
    articlesNum: 324,
    resourceNum: 30,
    internalPerson: "是",
  },{
    key: '7',
    name: 'John Brown7',
    email: "235621618@qq.com",
    phone: 17453344318,
    loginTime: 2011,
    articlesNum: 324,
    resourceNum: 30,
    internalPerson: "是",
  },{
    key: '8',
    name: 'John Brown8',
    email: "235621618@qq.com",
    phone: 17453344318,
    loginTime: 2011,
    articlesNum: 324,
    resourceNum: 30,
    internalPerson: "是",
  },{
    key: '9',
    name: 'John Brown9',
    email: "235621618@qq.com",
    phone: 17453344318,
    loginTime: 2011,
    articlesNum: 324,
    resourceNum: 30,
    internalPerson: "是",
  },{
    key: '10',
    name: 'John Brown10',
    email: "235621618@qq.com",
    phone: 17453344318,
    loginTime: 2011,
    articlesNum: 324,
    resourceNum: 30,
    internalPerson: "是",
  },{
    key: '11',
    name: 'John Brown11',
    email: "235621618@qq.com",
    phone: 17453344318,
    loginTime: 2011,
    articlesNum: 324,
    resourceNum: 30,
    internalPerson: "是",
  }],
  visible: false
}

export const actionTypes = {
  SHOW_MODAL: 'SHOW_MODAL',
  CANCEL_MODAL: 'CANCEL_MODAL',
  OK: 'OK'
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return {
        ...state, visible: true
      };
    case actionTypes.CANCEL_MODAL:
      return {
        ...state, visible: false
      };
    case actionTypes.OK:
      return {
        ...state, visible: false
      };
    default: 
      return state;
  }
}