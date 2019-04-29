import ImCookie from '@tencent/im-cookie';
// import request from './request';
// import ajax from './ajax';

// 判断平台
function isPlatform() {
  const ua = navigator.userAgent || '';
  const iPad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const iPhone = !iPad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  const iPod = ua.match(/(iPod).*OS\s([\d_]+)/);
  const android = ua.match(/(Android)\s+([\d.]+)/) || ua.match(/Android/);
  const wp = ua.match(/Windows Phone ([\d.]+)/);
  let rs;
  if (iPhone || iPad || iPod) {
    rs = 'ios';
  } else if (android) {
    rs = 'android';
  } else if (wp) {
    rs = 'wp';
  } else {
    rs = 'PC';
  }
  return rs;
}

// 生成session_id
function generateSessionId() {
  const time = +new Date();
  const sessionId = `${parseInt(Math.random() * 9000 + 1000, 10)}_${time}`;
  localStorage.setItem('sessionId', sessionId);
  localStorage.setItem('last_sessionid_time', time);
  return sessionId;
}

function getSessionId() {
  const sessionId = localStorage.getItem('sessionId') || '';
  const TIMEOUT = 24 * 60 * 60 * 1000; // 会话设置超时时间： 从5分 修改为24小时

  if (!sessionId) {
    return generateSessionId();
  }

  const lastTime = localStorage.getItem('last_sessionid_time') || 0;
  const currentTime = +new Date();
  if (currentTime - lastTime >= TIMEOUT) {
    const currentSessionId = generateSessionId();
    // sessionid开始
    return currentSessionId;
  }

  const time = +new Date();
  localStorage.setItem('sessionId', sessionId);
  localStorage.setItem('last_sessionid_time', time);

  return sessionId;
}

// 获取设备Id
function getDeviceId() {
  let deviceId;
  if (localStorage.getItem('device_id')) {
    return localStorage.getItem('device_id');
  }
  deviceId = Math.random();
  while (deviceId !== Math.round(deviceId)) {
    deviceId *= 10;
  }
  localStorage.setItem('device_id', deviceId);
  return deviceId;
}

function parseParams(data) {
  try {
    const tempArr = [];
    Object.keys(data).forEach((i) => {
      const key = encodeURIComponent(i);
      const value = encodeURIComponent(data[i]);
      tempArr.push(`${key}=${value}`);
    });
    const urlParamsStr = tempArr.join('&');
    return urlParamsStr;
  } catch (err) {
    return '';
  }
}

// 获得操作系统
function isWhatPc() {
  const sUserAgent = navigator.userAgent;
  const isWin = (navigator.platform === 'Win32') || (navigator.platform === 'Windows');
  const isMac = (navigator.platform === 'Mac68K')
  || (navigator.platform === 'MacPPC')
  || (navigator.platform === 'Macintosh')
  || (navigator.platform === 'MacIntel');
  if (isMac) { return 'Mac'; }
  const isUnix = (navigator.platform === 'X11') && !isWin && !isMac;
  if (isUnix) { return 'Unix'; }
  const isLinux = (String(navigator.platform).indexOf('Linux') > -1);
  if (isLinux) { return 'Linux'; }
  if (isWin) {
    const isWin2K = sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1;
    if (isWin2K) { return 'Win2000'; }
    const isWinXP = sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1;
    if (isWinXP) { return 'WinXP'; }
    const isWin2003 = sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1;
    if (isWin2003) { return 'Win2003'; }
    const isWinVista = sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1;
    if (isWinVista) { return 'WinVista'; }
    const isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1;
    if (isWin7) { return 'Win7'; }
  }
  return 'other';
}

export default function reportEventToDc(options) {
  const optionsDefault = {
    fdatetime: +new Date(),
    session_id: getSessionId(),
    abcmouse_id: getDeviceId(),
    device_id: getDeviceId(),
    dcid: 'dc04143',
    cookie_id: getDeviceId(),
    member_id: ImCookie.get('member_id') || '',
    User_Level: '', // pc没有
    SystemType: 'browser',
    ModuleType: 'HomeworkPage',
    ResourceType: '',
    ActivityType: '',
    Action: 'click',
    Action_Value: 'assign_homework',
    Action_Status: '',
    Action_KVP: '',
    SubView: '', // 没有子页
    GroupType: '',
    SessionEventCount: '',
    DataSource: 'pc',
    Qua: '',
    web_version: '',
    mac: '', // 获取不到
    idfa: '', // 获取不到
    idfv: '', // 获取不到
    imei: '', // 获取不到
    network_type: '', // 只要移动
    mobile_type: '', // 只要移动
    gateway_ip: '', // 后台获取
    client_ip: '', // 后台获取
    platform: isPlatform(),
    device_type: isWhatPc(),
    device_model: '', // 获取不到
    device_resolution: `${window.screen.availWidth}×${window.screen.availHeight}`,
    app_version: '', // 没有
    environment: '', // 后台获取
    os_version: isWhatPc(),
    clientrealip: '', // 后台获取
    MUID: '', // pc没有
    firstdatetime: performance.timing.navigationStart,
    experiment_user: '', // pc没有
    experiment: '', // pc没有
    openid: '', // pc没有
  };
  Object.assign(optionsDefault, options);
  optionsDefault.sid = (parseInt(ImCookie.get('report_sid'), 10) || -201903111334) && 0x7fffffff;
  fetch(`https://h5.abcmouse.qq.com/abcmouse/report?${parseParams(optionsDefault)}`).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });
}
