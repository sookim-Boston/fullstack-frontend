const store = require('./../store')

const onStart = function (event) {
  event.preventDefault()
  const timerId = $(event.target).data('id')
  const timerElement = $('#' + timerId)
  // filter the array to get the object that matches the value of id
  const newArray = (store.timers.timers).filter(obj => {
    return obj['id'] === timerId
  })
  let seconds = newArray[0]['minutes'] * 60 + newArray[0]['seconds']
  setInterval(function () {
    if (seconds > 0) {
      seconds--
      let displaySeconds = Math.floor(seconds / 60)
      let minutes = seconds % 60
      if (displaySeconds < 10) {
        displaySeconds = `0${displaySeconds}`
      }
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      timerElement.find('.minutes').html(displaySeconds)
      timerElement.find('.seconds').html(minutes)
    }
  }, 1000)
}

module.exports = {
  onStart
}
