import style from './styles/loader.scss'



function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 ).toString().split('');
  var minutes = Math.floor( (t/1000/60) % 60 ).toString().split('');
  var hours = Math.floor( (t/(1000*60*60)) % 24 ).toString().split('');
  var days = Math.floor( t/(1000*60*60*24) ).toString().split('');
  return {
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

(function () {
  var premierDate = 'September 30 2019 22:00:00';
  // var days = document.getElementById('days');
  // var hours = document.getElementById('hours');
  // var minutes = document.getElementById('minutes');
  var seconds = document.getElementById('seconds');

  setInterval(function(){
    var timeR = getTimeRemaining(premierDate);

    if(timeR.days.length!==2) {
      timeR.days.unshift('0')
    }
    if(timeR.hours.length!==2) {
      timeR.hours.unshift('0')
    }
    if(timeR.minutes.length!==2) {
      timeR.minutes.unshift('0')
    }
    if(timeR.seconds.length!==2) {
      timeR.seconds.unshift('0')
    }
    console.log(timeR)
    setTimer(days,timeR.days);
    setTimer(hours,timeR.hours);
    setTimer(minutes,timeR.minutes);
    setTimer(seconds,timeR.seconds);

  }, 1000);
})();

function setTimer(timeType, timeVal) {
  var daysData = timeType.querySelectorAll("[data-count]");
  if (daysData.length ===4) {
    daysData.forEach(function(el, idx) {
      if(idx < 2) {
        var curr = el.getAttribute('data-count');
        var incoming = timeVal[0];
        if(curr !== incoming) {
          el.setAttribute('data-count', timeVal[0]);
        }
      } else {
        var curr = el.getAttribute('data-count');
        var incoming = timeVal[1];
        if(curr !== incoming) {
          el.setAttribute('data-count', timeVal[1]);
        }
      }
    })
  } else {
    console.log('missing a card')
  }
}
