//合并多个reducers
import { combineReducers } from 'redux';

// import menuChange from './menuChange';
import reportArtical from './reportArtical';
import reportSource from './reportSource';
import reportComment from './reportComment';
import postReArtical from './postReArtical';
import postStopArtical from './postStopArtical';
import postReSource from './postReSource';
import postStopSource from './postStopSource';
import postReComment from './postReComment';
import postStopComment from './postStopComment';
import deleteArtical from './deleteArtical';
import deleteComment from './deleteComment';
import deleteSource from './deleteSource';
import getReCommentDetail from './getReCommentDetail';
import pageManagement from './pageManagementReducer';
import rightsManagement from './rightsManagementReducer';
import lineChartData from './lineChart';
import articleManageReducer from './articleManageReducer';
import resourceManageReducer from './resourceManageReducer';
import normalUserReducer from './normalUserReducer';

const rootReducer = combineReducers({
    pageManagement, rightsManagement,
    lineChartData,
    articleManageReducer,
    resourceManageReducer,
    normalUserReducer,
    // menuChange, 
    reportArtical, 
    reportSource, 
    reportComment, 
    getReCommentDetail,
    postReArtical, 
    postStopArtical, 
    postReSource, 
    postStopSource, 
    postReComment, 
    postStopComment,
    deleteArtical,
    deleteComment,
    deleteSource,
    pageManagement, 
    rightsManagement,
    lineChartData
})


export default rootReducer;