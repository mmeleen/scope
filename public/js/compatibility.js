// var axios = require('axios');

$(document).ready(function () {
  function compatibility(yourName, theirName, yourDOB, theirDOB) {
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://astrology-horoscope.p.rapidapi.com/zodiac_compatibility/result",
      method: "POST",
      headers: {
        "x-rapidapi-host": "astrology-horoscope.p.rapidapi.com",
        "x-rapidapi-key": "5caeaef20cmsh9c842b055ba0f73p144b7cjsncb86644bad8e",
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        v4: "json",
        mystic_dob: yourDOB,
        mystic_dob2: theirDOB,
        mystic_name: yourName,
        mystic_name2: theirName,
      },
    };
    $.ajax(settings).done(function (response) {
      $("#contents").empty();

      $("#results").empty();
    //   console.log(response);

      $("#results").append(card(response));
    });
  }
//   var compatibility = data.data.Compatibility;
  function card(response) {
      var info = JSON.parse(response);
      var details = info.data.Compatibility.details;
      console.log(info);
    var createCard =
    ' <div style ="width: 90%;"  class="card results-card"><div class="card-body"><h3 class="card-title">Compatibility Results</h3><p class="card-text">' + details + '</p>';
    return createCard;
  }

  $("#get-results").on("keypress click", function (event) {
    event.preventDefault();
    var yourName = $(".your-name").val().trim();
    var theirName = $(".their-name").val().trim();
    var yourDOB = $(".yourDOB").val().trim();
    var theirDOB = $(".theirDOB").val().trim();
   
      compatibility(yourName, theirName, yourDOB, theirDOB);
    }
  );
});
