const store = require('./../store')

const onStart = function (event) {
  event.preventDefault()
  $('.start-button').attr('disabled', 'disabled')
  const timerId = $(event.target).data('id')
  const timerElement = $('#' + timerId)
  // filter the array to get the object that matches the value of id
  const newArray = (store.timers.timers).filter(obj => {
    return obj['id'] === timerId
  })
  // convert minutes into seconds and add to seconds
  let seconds = newArray[0]['minutes'] * 60 + newArray[0]['seconds']
  // if seconds is more than 0, it will run setInterval () every 1 milliseconds
  store.interval = setInterval(function () {
    if (seconds > 0) {
      seconds--
      let displaySeconds = Math.floor(seconds / 60)
      let minutes = seconds % 60
      // if seconds & minutes are less than 10, add 0 in front of the number
      if (displaySeconds < 10) {
        displaySeconds = `0${displaySeconds}`
      }
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      // display seconds and minutes
      timerElement.find('.minutes').html(displaySeconds)
      timerElement.find('.seconds').html(minutes)
    }
  }, 1000)
}

module.exports = {
  onStart
}
