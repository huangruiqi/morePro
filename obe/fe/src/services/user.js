import request from '../utils/request'

export function Login(opts) {
  return request('/api/user/login', opts)
}

export function Logout(opts) {
  return request('/api/user/logout', opts)
}

export function GetUserInfo(opts) {
  return request('/api/user/', opts)
}