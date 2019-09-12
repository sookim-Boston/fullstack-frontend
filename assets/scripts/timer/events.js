const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')
const timer = require('./timer')

const onGetTimers = event => {
  // event.preventDefault()
  api.getTimers()
    .then(ui.getTimersSuccess)
    .catch(ui.onFailure)
}

const onCreate = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  store.timer = data
  if (data.timer.seconds >= 60) {
    $('#message3').html('You can only go up to 59 seconds!')
    $('form').trigger('reset')
  } else if (data.timer.minutes >= 100) {
    $('#message3').html('You can only go up to 99 minutes!')
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
  const id = $(event.target).data('id')
  api.deleteTimer(id)
    .then(() => onGetTimers(event))
    .then(ui.onDeleteSuccess)
    .catch(ui.onFailure)
}

const onUpdate = (event) => {
  event.preventDefault()
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
  } else {
    api.updateTimer(data, updateId)
      .then(() => onGetTimers(event))
      .catch(ui.onFailure)
  }
}

const onReset = (event) => {
  event.preventDefault()
  clearInterval(store.interval)
  $('.start-button').removeAttr('disabled')
  const id = $(event.target).data('id')
  const timerElement = $('#' + id)
  // filter the array to get the object that matches the value of id
  const newArray = (store.timers.timers).filter(obj => {
    return obj['id'] === id
  })
  // get the value of minutes and seconds from the data and set them as variables
  let seconds = newArray[0]['seconds']
  let minutes = newArray[0]['minutes']
  // only reset when the number length is 1
  if (seconds !== null && seconds.toString().length === 1) {
    seconds = `0${seconds}`
    timerElement.find('.seconds').html(seconds)
  } else if (seconds === null) {
    seconds = '00'
    timerElement.find('.seconds').html(seconds)
  }
  if (minutes !== null && minutes.toString().length === 1) {
    minutes = `0${minutes}`
    timerElement.find('.minutes').html(minutes)
  } else if (minutes === null) {
    minutes = '00'
    timerElement.find('.minutes').html(minutes)
  }
  timerElement.find('.minutes').html(minutes)
  timerElement.find('.seconds').html(seconds)
}

const addHandlers = () => {
  $('#pomodoro-app').on('click', '.delete-button', onDelete)
  $('#pomodoro-app').on('submit', '.updateTimer', onUpdate)
  $('#pomodoro-app').on('click', '.start-button', timer.onStart)
  $('#pomodoro-app').on('click', '.reset-button', onReset)
}

module.exports = {
  onCreate,
  onDelete,
  onReset,
  addHandlers,
  onGetTimers
}
