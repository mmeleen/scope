$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then(function(data) {
    $('.member-name').text(data.name);
  });

  $.get('/api/allHoroscopes/', function(results) {
    console.log(results);
    console.log(results.yesterday.description);
    console.log(results.today.description);
    console.log(results.tomorrow.description);

    $('#yesterdays-description').text(results.yesterday.description);
    $('#todays-description').text(results.today.description);
    $('#tomorrows-description').text(results.tomorrow.description);
  });

  $('#save').on('click', function(event) {
    event.preventDefault();
    var search = {
      date: $('#').val(),
      description: $('#').val(),
      mood: $('#').val(),
      color: $('#').val(),
      lucky_number: $('#').val(),
      lucky_time: $('#').val()
    };
    
    $.post('/api/saveSearch/', search, function(data) {
      console.log(data);
    });

    //adding thre day forecast
    $("#yesterdays-description").text(results.yesterday.description);
    $("#todays-description").text(results.today.description);
    $("#tomorrows-description").text(results.tomorrow.description);

    // adding color blocks to page
    let yesColor = results.yesterday.color;
    let todColor = results.today.color;
    let tomColor = results.tomorrow.color;
    console.log(yesColor);
    let colorContainerYes = $(`<div>`).css({
      "background-color": yesColor,
      height: "40px",
      width: "40px",
    });
    $(".color-oyd").append(colorContainerYes);

    console.log(todColor);
    let colorContainerTod = $(`<div>`).css({
      "background-color": todColor,
      height: "40px",
      width: "40px",
    });
    $(".color-otd").append(colorContainerTod);

    console.log(tomColor);
    let colorContainerTom = $(`<div>`).css({
      "background-color": tomColor,
      height: "40px",
      width: "40px",
    });
    $(".color-otm").append(colorContainerTom);
  });
});
