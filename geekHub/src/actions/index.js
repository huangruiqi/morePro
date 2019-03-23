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
    ARTICAL_REPORT_POST,
    ARTICAL_STOP_POST,
    SOURCE_REPORT_POST,
    SOURCE_STOP_POST,
    COMMENT_REPORT_POST,
    COMMENT_STOP_POST,
    ARTICAL_REPORT_DELETE,
    SOURCE_REPORT_DELETE,
    COMMENT_REPORT_DELETE,
    // GET_REPORTCOMMENT_DETAIL,
    FETCH_REPORTCOMMENT_DETAIL
} from "./actionTypes";

//非登陆页面，导航显示
export const showMenu = ()=>{
    return {
        type:'SHOW'
    }
}
//登陆页面，导航消失
export const hideMenu = ()=>{
    return {
        type:'HIDE'
    }
}

//触发获取举报文章信息
export const getReportArtical = () => {
    return {
        type: ARTICAL_FETCH_REPORT,
    }
}
//存储所有举报文章信息
export const storeReArtical = (objectArray) => {
    return {
        type: CHANGE_REPORTARTICAL_DATA,
        objectArray
    }
}
//删除举报文章信息
export const deleteReportArtical = (key) => {
    return {
        type: DELETE_REPORTARTICAL_DATA,
        key
    }
}



//触发获取举报文章信息
export const getReportSource = () => {
    return {
        type: SOURCE_FETCH_REPORT,
    }
}
//传递举报资源信息
export const storeReSource = (objectArray) => {
    return {
        type: CHANGE_REPORTSOURCE_DATA,
        objectArray
    } 
}
//删除举报资源信息
export const deleteReportSource = (key) => {
    return {
        type: DELETE_REPORTSOURCE_DATA,
        key
    }
}


//触发获取举报评论信息
export const getReportComment = () => {
    return {
        type: COMMENT_FETCH_REPORT,
    }
}
//传递举报评论信息
export const storeReComment = (objectArray) => {
    return {
        type: CHANGE_REPORTCOMMENT_DATA,
        objectArray
    }
}

export const deleteReportComment = (key) => {
    return {
        type: DELETE_REPORTCOMMENT_DATA,
        key
    }
}

//发送举报
//触发获取文章举报信息
export const postReportArtical = (postReArtical) => {
    return {
        type: ARTICAL_REPORT_POST,
        postReArtical
    }
}

//触发举报文章冻结用户
export const postStopArtical = (postStopArtical) => {
    return {
        type: ARTICAL_STOP_POST,
        postStopArtical
    }
}
//触发举报资源举报信息
export const postReportSource = (postReSource) => {
    return {
        type: SOURCE_REPORT_POST,
        postReSource
    }
}

//触发举报资源冻结用户通知信息
export const postStopSource = (postStopSource) => {
    return {
        type: SOURCE_STOP_POST,
        postStopSource
    }
}
//触发举报评论举报信息
export const postReportComment = (postReComment) => {
    return {
        type: COMMENT_REPORT_POST,
        postReComment
    }
}

//触发举报评论冻结用户通知信息
export const postStopComment = (postStopComment) => {
    return {
        type: COMMENT_STOP_POST,
        postStopComment
    }
}


//触发获取举报评论详情
export const fetchCommentDetail = (id) => {
    return {
        type: FETCH_REPORTCOMMENT_DETAIL,
        id
    }
}
//获取举报评论详情
// export const getReCommentDetail = (objectArray) => {
//     return {
//         type: GET_REPORTCOMMENT_DETAIL,
//         objectArray
//     }
// }
//触发举报文章删除数据
export const deleteArtical = (dataId) => {
    return {
        type: ARTICAL_REPORT_DELETE,
        dataId
    }
}
//触发举报资源删除数据
export const deleteSource = (dataId) => {
    return {
        type: SOURCE_REPORT_DELETE,
        dataId
    }
}
//触发举报评论删除数据
export const deleteComment = (dataId) => {
    return {
        type: COMMENT_REPORT_DELETE,
        dataId
    }
}
