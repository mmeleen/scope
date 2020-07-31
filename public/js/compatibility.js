// var axios = require('axios');



$(document).ready(function () {
   function compatibility(yourName, theirName, yourDOB, theirDOB,) {
    var settings = {
        "async": true,
        "crossDomain": true,
        method:"POST",
        url:"https://astrology-horoscope.p.rapidapi.com/zodiac_compatibility/result",
        headers:{
        "content-type":"application/x-www-form-urlencoded",
        "x-rapidapi-host":"astrology-horoscope.p.rapidapi.com",
        "x-rapidapi-key":"5caeaef20cmsh9c842b055ba0f73p144b7cjsncb86644bad8e",
       
        },
        data:{
        mystic_dob: yourDOB,
        mystic_dob2:theirDOB,
        mystic_name:yourName,
        mystic_name2:theirName
        }
     }
     $.ajax((settings, ( function(response) {
            $("#contents").empty();

            $("#results").empty();
            console.log(response.data)
            var compatibility = response.data.data.Compatibility
          
        $("#results").append(card(compatibility));
          })
          ));
    
    
        function card(compatibility) {
    var createCard = ' <div class="card results-card"><div class="card-body"><h5 class="card-title">' + yourName +' <p>and</p> '+ theirName + ' <p>compatibility</p> ' + '</h5><p class="card-text">' + compatibility + '</p>';
            return createCard;
        } 
    }


    $("#get-results").on("keypress click", function (event) {
        event.preventDefault();
        var yourName = $(".your-name").val().trim()
        var theirName = $(".their-name").val().trim()
        var yourDOB = $(".yourDOB").val().trim()
        var theirDOB = $(".theirDOB").val().trim()
        
            compatibility(yourName, theirName, yourDOB, theirDOB);
    })

});