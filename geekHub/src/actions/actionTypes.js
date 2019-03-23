// 权限管理
// 申请处理
export const RIGHTS_AGREE = 'RIGHTS_AGREE';
export const RIGHTS_AGREE_SUCCESS = 'RIGHTS_AGREE_SUCCESS';
export const RIGHTS_AGREE_FAILURE = 'RIGHTS_AGREE_FAILURE';

export const RIGHTS_DISAGREE = 'RIGHTS_DISAGREE';
export const RIGHTS_DISAGREE_SUCCESS = 'RIGHTS_DISAGREE_SUCCESS';
export const RIGHTS_DISAGREE_FAILURE = 'RIGHTS_DISAGREE_FAILURE';

// 生成邀请码
export const RIGHTS_GET_VERIFICATION_CODE = 'RIGHTS_GET_VERIFICATION_CODE' ;
export const RIGHTS_GET_INVITATION_CODE = 'RIGHTS_GET_INVITATION_CODE' ;

export const CHANGE_REPORTARTICAL_DATA = 'CHANGE_REPORTARTICAL_DATA';//改变举报文章资源行
export const CHANGE_REPORTSOURCE_DATA = 'CHANGE_REPORTSOURCE_DATA';//改变举报资源行数据
export const CHANGE_REPORTCOMMENT_DATA = 'CHANGE_REPORTCOMMENT_DATA';//改变举报资源行数据
export const DELETE_REPORTARTICAL_DATA = 'DELETE_REPORTARTICAL_DATA';//删除举报文章资源行
export const DELETE_REPORTSOURCE_DATA = 'DELETE_REPORTSOURCE_DATA';//删除举报文章资源行
export const DELETE_REPORTCOMMENT_DATA = 'DELETE_REPORTCOMMENT_DATA';//删除举报评论资源行

export const GET_REPORTCOMMENT_DETAIL = 'GET_REPORTCOMMENT_DETAIL';//获取评论详情
export const FETCH_REPORTCOMMENT_DETAIL = 'FETCH_REPORTCOMMENT_DETAIL';//触发获取评论详情

export const ARTICAL_FETCH_REPORT = 'ARTICAL_FETCH_REPORT';//触发调用saga获取举报文章数据
export const SOURCE_FETCH_REPORT = 'SOURCE_FETCH_REPORT';//触发调用saga获取举报资源数据
export const COMMENT_FETCH_REPORT = 'COMMENT_FETCH_REPORT';//触发调用saga获取举报评论数据

export const ARTICAL_REPORT_POST = 'ARTICAL_REPORT_POST';//发送举报文章的举报信息
export const ARTICAL_STOP_POST = 'ARTICAL_STOP_POST';//发送举报文章的冻结信息
export const SOURCE_REPORT_POST = 'SOURCE_REPORT_POST';//发送举报资源的举报信息
export const SOURCE_STOP_POST = 'SOURCE_STOP_POST';//发送举报资源的冻结信息
export const COMMENT_REPORT_POST = 'COMMENT_REPORT_POST';//发送举报评论的举报信息
export const COMMENT_STOP_POST = 'COMMENT_STOP_POST';//发送举报评论的冻结信息

export const ARTICAL_REPORT_DELETE = 'ARTICAL_REPORT_DELETE';//删除文章举报数据
export const SOURCE_REPORT_DELETE = 'SOURCE_REPORT_DELETE';//删除文章举报数据
export const COMMENT_REPORT_DELETE = 'COMMENT_REPORT_DELETE';//删除文章举报数据