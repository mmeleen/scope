$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.name);
  });
  var yesColor;
  var todColor;
  var tomColor;

  $.get("/api/allHoroscopes/", function(results) {
    console.log(results);

    $("#yesterdays-date").text(results.yesterday.current_date);
    $("#todays-date").text(results.today.current_date);
    $("#tomorrows-date").text(results.tomorrow.current_date);

    $("#yesterdays-description").text(results.yesterday.description);
    $("#todays-description").text(results.today.description);
    $("#tomorrows-description").text(results.tomorrow.description);

    //adding thre day forecast
    $("#yesterdays-description").text(results.yesterday.description);
    $("#todays-description").text(results.today.description);
    $("#tomorrows-description").text(results.tomorrow.description);
    //lucky numbers
    $("#lucky-number-yd").text(results.yesterday.lucky_number);
    $("#lucky-number-td").text(results.today.lucky_number);
    $("#lucky-number-tm").text(results.tomorrow.lucky_number);
    //lucky time
    $("#lucky-time-yd").text(results.yesterday.lucky_time);
    $("#lucky-time-td").text(results.today.lucky_time);
    $("#lucky-time-tm").text(results.tomorrow.lucky_time);
    //lucky time
    $("#mood-yd").text(results.yesterday.mood);
    $("#mood-td").text(results.today.mood);
    $("#mood-tm").text(results.tomorrow.mood);

    // adding color blocks to page
    yesColor = results.yesterday.color;
    todColor = results.today.color;
    tomColor = results.tomorrow.color;
    console.log(yesColor);
    let colorContainerYes = $(`<div>`).css({
      "background-color": yesColor,
      height: "40px",
      width: "40px",
    });
    $("#color-oyd").append(colorContainerYes);

    console.log(todColor);
    let colorContainerTod = $(`<div>`).css({
      "background-color": todColor,
      height: "40px",
      width: "40px",
    });
    $("#color-otd").append(colorContainerTod);

    console.log(tomColor);
    let colorContainerTom = $(`<div>`).css({
      "background-color": tomColor,
      height: "40px",
      width: "40px",
    });
    $("#color-otm").append(colorContainerTom);
  });
});
$("#yes-save").on("click", function(event) {
  event.preventDefault();
  var search = {
    date: $("#yesterdays-date").text(),
    description: $("#yesterdays-description").text(),
    mood: $("#mood-yd").text(),
    color: "Orange",
    lucky_number: $("#lucky-number-yd").text(),
    lucky_time: $("#lucky-time-yd").text(),
  };
  console.log(search);
  // let sSearch = JSON.stringify(search);

  $.post("/api/saveSearch", { search: search }, function(data) {
    console.log(data);
  });
});
