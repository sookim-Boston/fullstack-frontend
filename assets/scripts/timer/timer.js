const store = require('./../store')

const onStart = function (event) {
  event.preventDefault()
  const timerId = $(event.target).data('id')
  const timerElement = $('#' + timerId)
  // filter the array to get the object that matches the value of id
  const arrayOfTimers = store.timers.timers
  const newArray = arrayOfTimers.filter(obj => {
    return obj['id'] === timerId
  })
  let seconds = newArray[0]['minutes'] * 60 + newArray[0]['seconds']
  setInterval(function () {
    if (seconds > 0) {
      seconds--
      timerElement.find('.minutes').html(Math.floor(seconds / 60))
      timerElement.find('.seconds').html(seconds % 60)
    } else {
      timerElement.find('.minutes').html('00')
      timerElement.find('.seconds').html('00')
    }
  }, 1000)
}

module.exports = {
  onStart
}
