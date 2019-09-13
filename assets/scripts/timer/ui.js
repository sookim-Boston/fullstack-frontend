// const store = require('./../store')
const showTimerTemplate = require('../templates/timers.handlebars')
const store = require('./../store')

const getTimersSuccess = function (data) {
  const showTimers = showTimerTemplate({timers: data.timers})
  store.timers = {timers: data.timers}
  $('#pomodoro-app').html(showTimers)
  $('form').trigger('reset')
}

const onCreateSuccess = function () {
  $('#message3').text('timer created!')
  $('.pause-button').show()
  setTimeout(() => {
    $('#message3')
      .text('')
  }, 3000)
}

const onDeleteSuccess = function () {
  $('#message3').text('timer deleted!')
  setTimeout(() => {
    $('#message3')
      .text('')
  }, 3000)
}

const onUpdateSuccess = function () {
  $('#message3').text('timer updated!')
  setTimeout(() => {
    $('#message3')
      .text('')
  }, 3000)
}
const onFailure = function () {
  $('#message3').text('Error occured')
}

module.exports = {
  getTimersSuccess,
  onFailure,
  onCreateSuccess,
  onDeleteSuccess,
  onUpdateSuccess
}
