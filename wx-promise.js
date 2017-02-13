// from https://github.com/maichong/labrador/blob/master/index.js

import { Promise } from './es6-promise'
const wxPromise = {}
module.exports = wxPromise

// 特别指定的wx对象中不进行Promise封装的方法
const noPromiseMethods = {
  clearStorage: 1,
  hideToast: 1,
  showNavigationBarLoading: 1,
  hideNavigationBarLoading: 1,
  drawCanvas: 1,
  canvasToTempFilePath: 1,
  hideKeyboard: 1,
};

Object.keys(wx).forEach((key) => {
  if (
    noPromiseMethods[key]                        // 特别指定的方法
    || /^(on|create|stop|pause|close)/.test(key) // 以on* create* stop* pause* close* 开头的方法
    || /\w+Sync$/.test(key)                      // 以Sync结尾的方法
  ) {
    // 不进行Promise封装
    wxPromise[key] = function () {
      if (__DEV__) {
        let res = wx[key].apply(wx, arguments);
        if (!res) {
          res = {};
        }
        if (res && typeof res === 'object') {
          res.then = () => {
            console.warn('wx.' + key + ' is not a async function, you should not use await ');
          };
        }
        return res;
      }
      return wx[key].apply(wx, arguments);
    };
    return;
  }

  // 其余方法自动Promise化
  wxPromise[key] = function (obj) {
    obj = obj || {};
    return new Promise((resolve, reject) => {
      obj.success = resolve;
      obj.fail = (res) => {
        if (res && res.errMsg) {
          reject(new Error(res.errMsg));
        } else {
          reject(res);
        }
      };
      wx[key](obj);
    });
  };
});
