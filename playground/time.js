const moment = require('moment');

var date = new Date()

console.log(date.getMonth());


var date = moment();
//pass in patterns into format
// MMM --> shorthand version of month --> Feb

// date.add(100, 'year').subtract(12, 'year')
// console.log(date.format('MMM Do, YYYY'));

console.log(date.format('H:mm a'));
