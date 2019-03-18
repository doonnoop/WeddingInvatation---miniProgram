function unionSqureTime(dateTime) {
  var hours = dateTime.getHours();
  var minutes = dateTime.getMinutes();
  var seconds = dateTime.getSeconds();
  var miliseconds = dateTime.getMilliseconds();

  return [hours, minutes, seconds, format3Numbers(miliseconds), (60 - seconds), (60 - minutes), (24 - hours)].map(formatNumber).join('')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function format3Numbers(n) {
  n = n.toString()
  if (n[2]) {
    return n;
  } else if (n[1]) {
    return '0' + n;
  } 

  return '00' + n;
}

module.exports = {
  unionSqureTime: unionSqureTime
}