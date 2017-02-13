import './es6-shim'
import wx from './wx-promise'
import api from './api'
import fetch from './fetch'
import { Promise } from './es6-promise'
const pd = console.log.bind(console)

module.exports = {
  pd,
  wx,
  api,
  fetch,
  Promise,
}
