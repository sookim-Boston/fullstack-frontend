'use strict'
const store = require('./../store')

const signUpSuccess = function () {
  $('#message').text('Signed up successfully')
  $('#message').removeClass()

  $('#message').addClass('success')
  $('form').trigger('reset')
  setTimeout(() => {
    $('#message')
      .text('')
      .removeClass('success')
  }, 3000)

  // console.log('signUpSuccess ran')
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
  $('#signed-in-user')
    .text('Succesfully signed in! User is: ' + data.user.email)
    .addClass('success')
  store.user = data.user
  // console.log('Successful sign in! User is ', store.user)
  $('#hideBeforeSignIn').show()
  $('#hideOnceSignIn').hide()
  $('form').trigger('reset')
  setTimeout(() => {
    $('#signed-in-user')
      .text('')
      .removeClass('success')
  }, 3000)
  $('.dropdown').show()
  $('#index').show()
  // console.log(store)
}

const signInFailure = function () {
  $('#message').text('Error on sign in')
  $('#message').addClass('failure')
  $('form').trigger('reset')
  setTimeout(() => {
    $('#message')
      .text('')
      .removeClass('failure')
  }, 3000)
}

const changePasswordSuccess = function (data) {
  $('#messageChangePW').text('Successsfully changed password')
  $('#messageChangePW').addClass('success')
  $('form').trigger('reset')
  setTimeout(() => {
    $('#messageChangePW')
      .text('')
      .removeClass('success')
  }, 3000)
}
const changePasswordFailure = function (data) {
  $('#messageChangePW').text('Error Occured. Please try again.')
  $('#messageChangePW').addClass('failure')
  $('form').trigger('reset')
  setTimeout(() => {
    $('#messageChangePW')
      .text('')
      .removeClass('failure')
  }, 3000)
}

const signOutSuccess = function () {
  store.user = null
  store.winner = null
  $('#signed-in-user').text('')
  $('#message').text('Signed out successfully')
  $('#message').addClass('success')
  $('#hideBeforeSignIn').hide()
  $('#hideOnceSignIn').show()
  $('#gameboard').hide()
  $('#player').text(``)
  $('#gameover').text('')
  $('#anotherBox').text('')
  $('#message3').text('')
  $('#moves').text(``)
  $('#numberOfPlays').text(``)
  $('form').trigger('reset')
  setTimeout(() => {
    $('#message')
      .text('')
      .removeClass('success')
  }, 3000)
  $('#index').hide()
}

const signOutFailure = function () {
  $('#message').text('Error Occured')
  $('#message').addClass('failure')
  $('form').trigger('reset')
  setTimeout(() => {
    $('#message')
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
