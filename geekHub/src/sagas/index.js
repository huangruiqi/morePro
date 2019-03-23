import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import { agree, disagree, getInvitationCode, getVerificationCode } from './rightsManagementSaga';
import { 
    queryReportArtical, 
    queryReportSource, 
    queryReportComment, 
    postReportArtical, 
    postStopArtical, 
    postReportSource, 
    postStopSource, 
    postReportComment, 
    postStopComment,
    deleteArtical,
    deleteSource,
    deleteComment,
    getReportCommentDetail
 } from '../service/request'
import { 
    CHANGE_REPORTARTICAL_DATA, 
    CHANGE_REPORTSOURCE_DATA, 
    DELETE_REPORTARTICAL_DATA, 
    DELETE_REPORTSOURCE_DATA, 
    CHANGE_REPORTCOMMENT_DATA, 
    DELETE_REPORTCOMMENT_DATA,
    ARTICAL_FETCH_REPORT,
    SOURCE_FETCH_REPORT,
    COMMENT_FETCH_REPORT,
    GET_REPORTCOMMENT_DETAIL,
    FETCH_REPORTCOMMENT_DETAIL,
    ARTICAL_REPORT_POST,
    ARTICAL_STOP_POST,
    SOURCE_REPORT_POST,
    SOURCE_STOP_POST,
    COMMENT_REPORT_POST,
    COMMENT_STOP_POST,
    ARTICAL_REPORT_DELETE,
    SOURCE_REPORT_DELETE,
    COMMENT_REPORT_DELETE,
    RIGHTS_AGREE, 
    RIGHTS_DISAGREE, 
    RIGHTS_GET_INVITATION_CODE, 
    RIGHTS_GET_VERIFICATION_CODE
} from "../actions/actionTypes";

//进行举报文章请求
function* getReportARTICAL(action) {
    try {
        const reportArticalData = yield call(queryReportArtical);
        yield put({ type: CHANGE_REPORTARTICAL_DATA, objectArray: reportArticalData.data });
    } catch (e) {
        yield console.log(e.message);
    }
}
//进行举报资源请求
function* getReportSource(action) {
    try {
        const reportSourceData = yield call(queryReportSource);
        yield put({ type: CHANGE_REPORTSOURCE_DATA, objectArray: reportSourceData.data });
    } catch (e) {
        yield console.log(e.message);
    }
}
//进行举报资源请求
function* getReportComment(action) {
    try {
        const reportComment = yield call(queryReportComment);
        let reportCommentData = [];
        switch (reportComment.data.code) {
            case 100001:
                reportCommentData = reportComment.data.data;
                yield put({ type: CHANGE_REPORTCOMMENT_DATA, objectArray: reportCommentData });
                break;
        
            default: 
                break;
        }
    } catch (e) {
        yield console.log(e.message);
    }
}
//发送文章举报人和被举报人信息
function* postReArtical(action) {
    // console.log(action.postReArtical);
    try {
        const dataAll = {
            writerId: action.postReArtical.writerId,
            reportId: action.postReArtical.reportId,
            writerWarn: action.postReArtical.writerWarn,
            reportWarn: action.postReArtical.reportWarn,
            articalId: action.postReArtical.articalId
        }
        yield call(postReportArtical, dataAll);
    } catch (e) {
        yield console.log(e.message);
    }
}
//提交举报文章的冻结信息
function* postStopReArtical(action) {
    try {
        const dataAll = {
            writerId: action.postStopArtical.writerId,
            writerInformation: action.postStopArtical.writerInformation,
            articalId: action.postStopArtical.articalId
        }
        yield call(postStopArtical, dataAll);
    } catch (e) {
        yield console.log(e.message);
    }    
}
//发送资源举报人和被举报人信息
function* postReSource(action) {
    // console.log(action.postReArtical);
    try {
        const dataAll = {
            writerId: action.postReSource.writerId,
            reportId: action.postReSource.reportId,
            writerWarn: action.postReSource.writerWarn,
            reportWarn: action.postReSource.reportWarn,
            articalId: action.postReSource.articalId
        }
        yield call(postReportSource, dataAll);
    } catch (e) {
        yield console.log(e.message);
    }
}
//提交举报文章的冻结信息
function* postStopReSource(action) {
    try {
        const dataAll = {
            writerId: action.postStopSource.writerId,
            writerInformation: action.postStopSource.writerInformation,
            articalId: action.postStopSource.articalId
        }
        yield call(postStopSource, dataAll);
    } catch (e) {
        yield console.log(e.message);
    }
}

//发送评论举报人和被举报人信息
function* postReComment(action) {
    // console.log(action.postReArtical);
    try {
        const dataAll = {
            writerId: action.postReComment.writerId,
            reportId: action.postReComment.reportId,
            writerWarn: action.postReComment.writerWarn,
            reportWarn: action.postReComment.reportWarn,
            articalId: action.postReComment.articalId
        }
        yield call(postReportComment, dataAll);
    } catch (e) {
        yield console.log(e.message);
    }
}
//提交举报评论的冻结信息
function* postStopComments(action) {
    try {
        const dataAll = {
            writerId: action.postStopComment.writerId,
            writerInformation: action.postStopComment.writerInformation,
            articalId: action.postStopComment.articalId
        }
        yield call(postStopComment, dataAll);
    } catch (e) {
        yield console.log(e.message);
    }
}

//删除举报文章数据行
function* deleteArticals(action) {
    try {
        const id = action.dataId;
        yield call(deleteArtical, id);
    } catch (e) {
        yield console.log(e.message);
    }
}
//删除举报资源数据行
function* deleteSources(action) {
    try {
        const id = action.dataId
        yield call(deleteSource, id);
    } catch (e) {
        yield console.log(e.message);
    }
}
//删除举报评论数据行
function* deleteComments(action) {
    try {
        const id = action.dataId
        yield call(deleteComment, id);
    } catch (e) {
        yield console.log(e.message);
    }
}

function* getReCommentDetail(action) {
    try {
        const id = action.id;
        const reCommentDetail = yield call(getReportCommentDetail, id);
        let reCommentDetailData = [];
        switch (reCommentDetail.data.code) {
            case 100001:
                reCommentDetailData = reCommentDetail.data.data;
                yield put({ type: GET_REPORTCOMMENT_DETAIL, detail: reCommentDetailData });
                break;

            default:
                break;
        }
    } catch (e) {
        yield console.log(e.message);
    }
}
function* mySaga() {
    yield all({
        getReArtical: takeEvery(ARTICAL_FETCH_REPORT, getReportARTICAL),
        getReSource: takeEvery(SOURCE_FETCH_REPORT, getReportSource),
        getReComment: takeEvery(COMMENT_FETCH_REPORT, getReportComment),
        getReCommentDetail: takeEvery(FETCH_REPORTCOMMENT_DETAIL, getReCommentDetail),
        postReArtical: takeEvery(ARTICAL_REPORT_POST, postReArtical),
        postStopArtical: takeEvery(ARTICAL_STOP_POST, postStopReArtical),
        postReSource: takeEvery(SOURCE_REPORT_POST, postReSource),
        postStopSource: takeEvery(SOURCE_STOP_POST, postStopReSource),
        postReComment: takeEvery(COMMENT_REPORT_POST, postReComment),
        postStopComment: takeEvery(COMMENT_STOP_POST, postStopComments),
        deleteArtical: takeEvery(ARTICAL_REPORT_DELETE, deleteArticals),
        deleteSource: takeEvery(SOURCE_REPORT_DELETE, deleteSources),
        deleteComment: takeEvery(COMMENT_REPORT_DELETE, deleteComments),
        agree: takeEvery(RIGHTS_AGREE, agree),
        disagree: takeEvery(RIGHTS_DISAGREE, disagree),
        getInvitationCode: takeEvery(RIGHTS_GET_INVITATION_CODE, getInvitationCode),
        getVerificationCode: takeEvery(RIGHTS_GET_VERIFICATION_CODE, getVerificationCode)
    });
}

export default mySaga;