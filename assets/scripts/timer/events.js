const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')
const timer = require('./timer')
const button = require('./buttons')

const onGetTimers = (event) => {
  // event.preventDefault()
  api.getTimers()
    .then(ui.getTimersSuccess)
    .catch(ui.onFailure)
}

const onCreate = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  clearInterval(store.resumeInterval)
  clearInterval(store.interval)
  store.timer = data
  // if the user creates a task with the same name
  if ((store.timers.timers.find(a => a['task_name'] === data.timer.task_name)) !== undefined) {
    $('#timer-create-message').html('You already have that task on the list')
    $('form').trigger('reset')
    // if the timer is more than 59 seconds
  } else if (data.timer.seconds >= 60 || data.timer.seconds < 0) {
    $('#timer-create-message').html('You can only go from 0 to 59 seconds!')
    $('form').trigger('reset')
    // if the minutes is more than 99
  } else if (data.timer.minutes >= 100 || data.timer.minutes < 0) {
    $('#timer-create-message').html('You can only go from 0 to 99 minutes!')
    $('form').trigger('reset')
    // if the inputs for minutes or seconds are not number
  } else if (isNaN(data.timer.minutes) === true || isNaN(data.timer.seconds) === true) {
    $('#timer-create-message').html('You can only put numbers')
    $('form').trigger('reset')
    // if the numbers are more than 2 digits
  } else if ((data.timer.minutes).toString().length > 2 || (data.timer.seconds).toString().length > 2) {
    $('#timer-create-message').html('Invalid Number!')
    $('form').trigger('reset')
  } else {
    api.create(data)
      .then(() => onGetTimers(event))
      .then(ui.onCreateSuccess)
      .catch(ui.onFailure)
  }
}
const onDelete = (event) => {
  event.preventDefault()
  // STOP all the intervlas
  clearInterval(store.interval)
  // STOP all the intervals
  clearInterval(store.resumeInterval)
  // get the id of the timer
  const id = $(event.target).data('id')
  // delete the timer on the database (API request)
  api.deleteTimer(id)
    .then($('#pomodoro-app').html(''))
    .then($('.task-dropdown-button').text('Choose your task'))
    .then(() => onGetTimers(event))
    .then(ui.onDeleteSuccess)
    .catch(ui.onFailure)
}

const onUpdate = (event) => {
  event.preventDefault()
  const timerId = $(event.target).data('id')
  const timerElement = $('#' + timerId)
  clearInterval(store.resumeInterval)
  clearInterval(store.interval)
  // when updated, the pause button is disabled
  timerElement.find('.pause-button').attr('disabled', 'disabled')
  // get the id of updated timer
  const updateId = $(event.target).data('id')
  const data = getFormFields(event.target)
  // feedback for the user
  $('#message3').text('timer updated!')
  // timer updated message will be gone after 3 milliseconds
  setTimeout(() => {
    $('#message3')
      .text('')
  }, 3000)
  // if the seconds input is more than 60
  if (data.timer.seconds >= 60) {
    $('#message3').html('You can only go up to 59 seconds!')
    $('form').trigger('reset')
    // if the minutes input is more than 99
  } else if (data.timer.minutes >= 100) {
    $('#message3').html('You can only go up to 99 minutes!')
    $('form').trigger('reset')
    // if minutes and/or seconds inputs are not a number
  } else if (isNaN(data.timer.minutes) === true || isNaN(data.timer.seconds) === true) {
    $('#message3').html('You can only put numbers')
    $('form').trigger('reset')
    // if minutes and/or seconds inputs are more than 2 digit numbers
  } else if ((data.timer.minutes).toString().length > 2 || (data.timer.seconds).toString().length > 2) {
    $('#message3').html('Invalid Number!')
    $('form').trigger('reset')
  } else {
    // send API request to update the timer
    api.updateTimer(data, updateId)
      .then(() => onGetTimers(event))
      .then(() => onGetTimer(event))
      .catch(ui.onFailure)
  }
}

const onGetTimer = (event) => {
  event.preventDefault()
  const id = $(event.target).data('id')
  api.getTimer(id)
    .then(ui.getTimerSuccess)
    .catch(ui.onFailure)
}

const addHandlers = () => {
  $('#pomodoro-app').on('click', '.delete-button', onDelete)
  $('#pomodoro-app').on('click', '.start-button', timer.onStart)
  $('#pomodoro-app').on('click', '.reset-button', button.onReset)
  $('#pomodoro-app').on('click', '.pause-button', button.onPause)
  $('#pomodoro-app').on('click', '.resume-button', button.onResume)
  $('#updateTimer').on('submit', onUpdate)
  $('#pomodoro-app').on('click', '.update-button', function () {
    const timerId = $(this).data('id')
    $('#updateTimer').data('id', timerId)
  })
  $('#get-task').on('click', onGetTimers)
  $('.task-dropdown').on('click', 'a', onGetTimer)
  $('.task-dropdown').on('click', 'a', function () {
    $('.task-dropdown-button').text($(this).text())
  })
}

module.exports = {
  onCreate,
  onDelete,
  addHandlers,
  onGetTimers,
  onUpdate,
  onGetTimer
}
