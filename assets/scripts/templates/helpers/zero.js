// HELPER EXAMPLE
// This helper would be used in a .handlebars file
// with the syntax {{limit title 20}}

'use strict'

const zero = (value) => {
  if (value < 10) {
    return '0' + value
  } else {
    return value
  }
}

// const limit = (str, length) => {
//   if (str.length <= length) {
//     return str
//   } else {
//     return str.substring(0, length) + '...'
//   }
// }

module.exports = zero
