const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onGetTimers = event => {
  event.preventDefault()
  api.getTimers()
    .then(ui.getTimersSuccess)
    .catch(ui.getTimersFailure)
}

const onCreate = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.create(data)
    .then(() => onGetTimers(event))
    .catch(ui.onCreateFailure)
}

const onDelete = (event) => {
  event.preventDefault()
  const id = $(event.target).data('id')
  console.log(id)
  api.deleteTimer(id)
    .then(() => onGetTimers(event))
    .catch(ui.onDeleteFailure)
}

const addHandlers = () => {
  $('.pomodoro-app').on('click', '.delete-button', onDelete)
}

module.exports = {
  onCreate,
  onDelete,
  addHandlers
}
