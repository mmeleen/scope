// var axios = require('axios');

$(document).ready(function () {
  function compatibility(yourName, theirName, yourDOB, theirDOB) {
    var settings = {
      async: true,
      crossDomain: true,
      url:
        'https://astrology-horoscope.p.rapidapi.com/zodiac_compatibility/result',
      method: 'POST',
      headers: {
        'x-rapidapi-host': 'astrology-horoscope.p.rapidapi.com',
        'x-rapidapi-key': '5caeaef20cmsh9c842b055ba0f73p144b7cjsncb86644bad8e',
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        v4: 'json',
        mystic_dob: yourDOB,
        mystic_dob2: theirDOB,
        mystic_name: yourName,
        mystic_name2: theirName,
      },
    };
    $.ajax(settings).done(function (response) {
      $('#contents').empty();

      $('#results').empty();
      //   console.log(response);

      $('#results').append(card(response));
    });
  }
  //   var compatibility = data.data.Compatibility;
  function card(response) {
    var info = JSON.parse(response);
    var details = info.data.Compatibility.details;
    var heading = info.data.Compatibility.heading;
    var yourSignImg = JSON.stringify(info.data.user.Image);
    var yourSign = info.data.user['Sun Sign'];
    var partnerImg = JSON.stringify(info.data.partner.Image);
    var partnerSign = info.data.partner['Sun Sign'];
    // console.log(info);
    var createCard =
      ' <div style ="width: 70%;" class="card results-card"><container class= "comp"><div class="card-header">Compatibility Results</div></container><div class="card-body"><container class = "space"><div class="thisclass"><img class = "yourImg" src='+ yourSignImg + 'alt="sign"></div><div class = "yoursign">' + yourSign + '</div><div class = "match"> ' + heading + '</div><div class =partnersign>' + partnerSign + '</div><div class ="thisclass"><img class "theirImg" src='+ partnerImg + 'alt="sign"></div></container><p class="card-text">' +
      details +
      '</p>';
    return createCard;
  }

  $('#get-results').on('keypress click', function (event) {
    event.preventDefault();
    var yourName = $('.your-name').val().trim();
    var theirName = $('.their-name').val().trim();
    var yourDOB = $('.yourDOB').val().trim();
    var theirDOB = $('.theirDOB').val().trim();

    compatibility(yourName, theirName, yourDOB, theirDOB);
  });
});
