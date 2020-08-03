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
    var yourSign = info.data.user['Sun Sign'];
    var partnerSign = info.data.partner['Sun Sign'];

    console.log(heading);

    // console.log(info);
    $('#compat-heading').text(heading);
    $('#compat-heading').css('font-color', 'white');
    $('#your-sign').text(yourSign);
    $('#their-sign').text(partnerSign);
    $('#your-sign-img').attr('src', 'assets/' + yourSign + '.png');
    $('#your-sign-img').attr('alt', 'Sign: ' + yourSign);
    $('#their-sign-img').attr('src', 'assets/' + partnerSign + '.png');
    $('#their-sign-img').attr('alt', 'Sign: ' + partnerSign);
    $('#compat-details').text(details);

    if (heading === 'An Excellent Match') {
      $('#compat-heading-div').css('color', 'green');
    } else if (heading === 'A Poor Match') {
      $('#compat-heading-div').css('color', 'red');
    } else if (heading === 'An Easy Match') {
      $('#compat-heading-div').css('color', 'green');
    } else if (heading === 'A Difficult Match') {
      $('#compat-heading-div').css('color', 'orange');
    } else if (heading === 'A Special Match') {
      $('#compat-heading-div').css('color', 'blue');
    } else if (heading === 'A Great Match') {
      $('#compat-heading-div').css('color', 'purple');
    } else {
      $('#compat-heading-div').css('color', 'coral');
    }

    return;
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
