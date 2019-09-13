import style from './styles/loader.scss'

function getData() {
  var xmlhttp = new XMLHttpRequest()
  var url =
      'https://placeholders-for-codepens.s3.us-east-2.amazonaws.com/lottery-placeholder.json'

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText)
      parseData(data)
    }
  };
  xmlhttp.open('GET', url, true)
  xmlhttp.send()
}

function parseData(data) {
  // console.log(data)
  const bgVideo = document.getElementById('bg-video')
  const powerball =
      parseInt(data.jackpots[0].estimatedJackpot.replace(/\D/g, ''), 10)
  const mega =
      parseInt(data.jackpots[1].estimatedJackpot.replace(/\D/g, ''), 10)

  const bgUrl = bgVideo.src.split('/')

  if (powerball >= 300 && mega < 300) {
    // powerball
    if (bgUrl[bgUrl.length - 1] !== 'powerball.mp4') {
      bgVideo.src = 'assets/powerball.mp4'
    } else {
      console.log('already set')
    }

    document.body.classList.remove('dual')
    document.body.classList.add('single')
    document.getElementById('single').innerHTML = '<sup>$</sup>' + powerball
  }
  else if (powerball < 300 && mega >= 300) {
    // mega
    if (bgUrl[bgUrl.length - 1] !== 'mega.mp4') {
      bgVideo.src = 'assets/mega.mp4'
    } else {
      console.log('already set')
    }

    document.body.classList.remove('dual')
    document.body.classList.add('single')
    document.getElementById('single').innerHTML = '<sup>$</sup>' + mega
  }
  else {
    // dual
    if (bgUrl[bgUrl.length - 1] !== 'dual.mp4') {
      bgVideo.src = 'assets/dual.mp4'
    } else {
      console.log('already set')
    }

    document.body.classList.remove('single')
    document.body.classList.add('dual')
    document.getElementById('power').innerHTML = '<sup>$</sup>' + powerball
    document.getElementById('mega').innerHTML = '<sup>$</sup>' + mega
  }
}

setInterval(refresh, 15000)

function refresh() {
  if (navigator.onLine) {
    getData()
    console.log('refresh')
  } else {
    console.log('offline')
  }
}

if (navigator.onLine) {
  getData()
}
