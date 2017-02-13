import fetch from './fetch'

class API {
  get(url, params={}, options={}) {
    return fetch(url, options).then(res => res.json())
  }

  post(url, body={}, options={}) {
    return fetch(url, Object.assign(options, {
      method: 'POST',
      body,
    })).then(res => res.json())
  }
}

module.exports = new API()
