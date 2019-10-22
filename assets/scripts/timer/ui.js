// const store = require('./../store')
// const showTimerTemplate = require('../templates/timers.handlebars')
const showTimerTemplate = require('../templates/timer.handlebars')
const store = require('./../store')
const showTaskTemplate = require('../templates/task.handlebars')
const taskDropdownTemplate = require(
  '../templates/dropdown.handlebars'
)

const getTimersSuccess = function (data) {
  const showTask = showTaskTemplate({timers: data.timers})
  // const showTimers = showTimerTemplate({timers: data.timers})
  // console.log(showTimers)
  const dropdownTask = taskDropdownTemplate({timers: data.timers})
  // show a list of tasks
  $('.task-dropdown').html(dropdownTask)
  $('.task-body').html(showTask)
  store.timers = {timers: data.timers}
  // $('#pomodoro-app').html(showTimers)
}

const getTimerSuccess = function (data) {
  console.log(data)
  const showTimer = showTimerTemplate({timer: data.timer})
  $('#pomodoro-app').html(showTimer)
  $('.resume-button').hide()
  $('.pause-button').attr('disabled', 'disabled')
  $('.reset-button').attr('disabled', 'disabled')
  $('form').trigger('reset')
}

const onCreateSuccess = function () {
  $('#timer-create-message').text('task created')
  setTimeout(() => {
    $('#timer-create-message')
      .text('')
  }, 3000)
}

const onDeleteSuccess = function () {
  $('.delete-message').text('task deleted successfully')
  setTimeout(() => {
    $('.delete-message')
      .text('')
  }, 3000)
}

const onUpdateSuccess = function () {
  $('#message3').text('task updated!')
  setTimeout(() => {
    $('#message3')
      .text('')
  }, 3000)
}
const onFailure = function () {
  $('signed-in-user').text('Error occured')
}

module.exports = {
  getTimersSuccess,
  onFailure,
  onCreateSuccess,
  onDeleteSuccess,
  onUpdateSuccess,
  getTimerSuccess
}
