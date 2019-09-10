'use strict'
const config = require('./../config')
const store = require('./../store')

const create = function (data) {
  return $.ajax({
    url: config.apiUrl + '/timers',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getTimers = function () {
  return $.ajax({
    url: config.apiUrl + '/timers',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteTimer = function (id) {
  return $.ajax({
    url: config.apiUrl + '/timers/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateTimer = function (data, id) {
  return $.ajax({
    url: config.apiUrl + '/timers/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}
module.exports = {
  create,
  getTimers,
  deleteTimer,
  updateTimer
}
