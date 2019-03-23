import {actionTypes} from '../reducers/normalUserReducer';

//展示冻结用户对话框
export const showModal = () => ({
	type: actionTypes.SHOW_MODAL
});
//隐藏冻结用户对话框
export const cancelModal = () => ({
	type: actionTypes.CANCEL_MODAL
});
//确定冻结用户
export const ok = () => ({
	type: actionTypes.OK
});