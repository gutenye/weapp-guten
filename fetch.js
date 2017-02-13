import { Promise } from './es6-promise'

class Response {
  constructor(res) {
    Object.assign(this, res)
  }

  json() {
    return new Promise((resolve, reject) => {
      resolve(this.data)
    })
  }
}

function fetch(url, {method, headers, body}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      header: headers,
      method,
      data: body,
      success(res) {
        resolve(new Response(res))
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

module.exports = fetch
