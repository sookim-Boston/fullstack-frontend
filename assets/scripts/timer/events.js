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
  if ((store.timers.timers.find(a => a['task_name'] === data.timer.task_name)) !== undefined) {
    $('#timer-create-message').html('You already have that task on the list')
    $('form').trigger('reset')
  } else if (data.timer.seconds >= 60 || data.timer.seconds < 0) {
    $('#timer-create-message').html('You can only go from 0 to 59 seconds!')
    $('form').trigger('reset')
  } else if (data.timer.minutes >= 100 || data.timer.minutes < 0) {
    $('#timer-create-message').html('You can only go from 0 to 99 minutes!')
    $('form').trigger('reset')
  } else if (isNaN(data.timer.minutes) === true || isNaN(data.timer.seconds) === true) {
    $('#timer-create-message').html('You can only put numbers')
    $('form').trigger('reset')
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
  clearInterval(store.interval)
  clearInterval(store.resumeInterval)
  const id = $(event.target).data('id')
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
  timerElement.find('.pause-button').attr('disabled', 'disabled')
  const updateId = $(event.target).data('id')
  const data = getFormFields(event.target)
  $('#message3').text('timer updated!')
  // timer updated message will be gone after 3 milliseconds
  setTimeout(() => {
    $('#message3')
      .text('')
  }, 3000)
  if (data.timer.seconds >= 60) {
    $('#message3').html('You can only go up to 59 seconds!')
    $('form').trigger('reset')
  } else if (data.timer.minutes >= 100) {
    $('#message3').html('You can only go up to 99 minutes!')
    $('form').trigger('reset')
  } else if (isNaN(data.timer.minutes) === true || isNaN(data.timer.seconds) === true) {
    $('#message3').html('You can only put numbers')
    $('form').trigger('reset')
  } else if ((data.timer.minutes).toString().length > 2 || (data.timer.seconds).toString().length > 2) {
    $('#message3').html('Invalid Number!')
    $('form').trigger('reset')
  } else {
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
