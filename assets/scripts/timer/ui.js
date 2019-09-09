// const store = require('./../store')
const showTimerTemplate = require('../templates/timers.handlebars')

const getTimersSuccess = function (data) {
  console.log(data)
  const showTimers = showTimerTemplate({timers: data.timers})
  $('#pomodoro-app').html(showTimers)
}

const onDeleteFailure = function () {
  $('#message3').text('Error occured')
}

module.exports = {
  getTimersSuccess,
  onDeleteFailure
}
