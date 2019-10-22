'use strict'
const store = require('./../store')

const signUpSuccess = function () {
  $('#message').text('Signed up successfully')
  $('#message').removeClass()

  $('#message').addClass('success')
  $('form').trigger('reset')
  $('#message3').text('')
  setTimeout(() => {
    $('#message')
      .text('')
      .removeClass('success')
  }, 3000)
}

const signUpFailure = function () {
  $('#message').text('Error on sign up')
  $('#message').addClass('failure')
  $('form').trigger('reset')
  setTimeout(() => {
    $('#message')
      .text('')
      .removeClass('failure')
  }, 3000)

  // console.error('signUpFailure ran')
}
const signInSuccess = function (data) {
  // $('#signed-in-user')
  //   .text('Succesfully signed in! User is: ' + data.user.email)
  //   .addClass('success')
  store.user = data.user
  $('#hide-before-sign-in').show()
  $('#hide-once-sign-in').hide()
  $('form').trigger('reset')
  // setTimeout(() => {
  //   $('#signed-in-user')
  //     .text('')
  //     .removeClass('success')
  // }, 3000)
  $('.dropdown').show()
  $('#firstModal').modal('hide')
}

const signInFailure = function () {
  $('#sign-in-form-message').text('Error on sign in')
  $('#sign-in-form-message').addClass('failure')
  $('form').trigger('reset')
  setTimeout(() => {
    $('#sign-in-form-message')
      .text('')
      .removeClass('failure')
  }, 3000)
}

const changePasswordSuccess = function (data) {
  $('#change-pw-message').text('Successsfully changed password')
  $('#change-pw-message').addClass('success')
  $('form').trigger('reset')
  setTimeout(() => {
    $('#change-pw-message')
      .text('')
      .removeClass('success')
  }, 3000)
}
const changePasswordFailure = function (data) {
  $('#change-pw-message').text('Error Occured. Please try again.')
  $('#change-pw-message').addClass('failure')
  $('form').trigger('reset')
  setTimeout(() => {
    $('#change-pw-message')
      .text('')
      .removeClass('failure')
  }, 3000)
}

const signOutSuccess = function () {
  store.user = null
  store.winner = null
  $('#signed-in-user').text('')
  $('#sign-out-message').text('Signed out successfully')
  $('#sign-out-message').addClass('success')
  $('#hide-before-sign-in').hide()
  $('#hide-once-sign-in').show()
  $('.task-dropdown').get(0).selectedIndex = 0
  $('#message3').text('')
  $('.task-dropdown-button').text('Choose your task')
  $('form').trigger('reset')
  setTimeout(() => {
    $('#sign-out-message')
      .text('')
      .removeClass('success')
  }, 3000)
  $('#index').hide()
  $('#pomodoro-app').html('')
}

const signOutFailure = function () {
  $('#sign-out-message').text('Error Occured')
  $('#sign-out-message').addClass('failure')
  $('form').trigger('reset')
  setTimeout(() => {
    $('#sign-out-message')
      .text('')
      .removeClass('failure')
  }, 3000)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
