const moment = require('moment');

var date = new Date()

console.log(date.getMonth());


var date = moment();
//pass in patterns into format
// MMM --> shorthand version of month --> Feb

// date.add(100, 'year').subtract(12, 'year')
// console.log(date.format('MMM Do, YYYY'));

var createdAt = 1234;
// We pass is 1234 as the time to use for momeent, but by default moment uses the current time.
// var date = moment(createdAt)
// console.log(date.format('H:mm a'));




var timestamp = moment().valueOf();
var date = moment(timestamp)
console.log(date.format('H:mm a'));
