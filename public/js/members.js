$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  const pastSearch = $(".scope-list");

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.name);
  });

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
    $("#lucky-time-yd").text(
      "Yesterdays Lucky Time: " + results.yesterday.lucky_time
    );
    $("#lucky-time-td").text("Todays Lucky Time: " + results.today.lucky_time);
    $("#lucky-time-tm").text(
      "Tomorrows Lucky Time: " + results.tomorrow.lucky_time
    );
    //lucky time
    $("#mood-yd").text("Yesterdays Mood: " + results.yesterday.mood);
    $("#mood-td").text("Todays Mood: " + results.today.mood);
    $("#mood-tm").text("Tomorrows Mood: " + results.tomorrow.mood);

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
    $("#yesterdays-color").text(yesColor);
    $("#color-oyd").append(colorContainerYes);

    console.log(todColor);
    let colorContainerTod = $(`<div>`).css({
      "background-color": todColor,
      height: "40px",
      width: "40px",
    });
    $("#todays-color").text(todColor);
    $("#color-otd").append(colorContainerTod);

    console.log(tomColor);
    let colorContainerTom = $(`<div>`).css({
      "background-color": tomColor,
      height: "40px",
      width: "40px",
    });
    $("#tomorrows-color").text(tomColor);
    $("#color-otm").append(colorContainerTom);
  });

  //start saving logic
  $("#yes-save").on("click", function(event) {
    event.preventDefault();
    let search = {
      date: $("#yesterdays-date").text(),
      description: $("#yesterdays-description").text(),
      mood: $("#mood-yd").text(),
      color: $("#yesterdays-color").text(),
      lucky_number: $("#lucky-number-yd").text(),
      lucky_time: $("#lucky-time-yd").text(),
    };
    saveToDB(search);
  });

  $("#tod-save").on("click", function(event) {
    event.preventDefault();

    let todsearch = {
      date: $("#todays-date").text(),
      description: $("#todays-description").text(),
      mood: $("#mood-td").text(),
      color: $("#todays-color").text(),
      lucky_number: $("#lucky-number-td").text(),
      lucky_time: $("#lucky-time-td").text(),
    };

    saveToDB(todsearch);
  });

  $("#tom-save").on("click", function(event) {
    event.preventDefault();
    var search = {
      date: $("#tomorrows-date").text(),
      description: $("#tomorrows-description").text(),
      mood: $("#mood-tm").text(),
      color: $("#tomorrows-color").text(),
      lucky_number: $("#lucky-number-tm").text(),
      lucky_time: $("#lucky-time-tm").text(),
    };

    saveToDB(search);
  });

  //function for posting to db
  function saveToDB(search) {
    $.post("/api/saveSearch", { search: search }, function(data) {
      renderPastSearches(data);
    });
  }

  //function to append the past searches to the page
  function renderPastSearches(data) {
    pastSearch.html("");
    data.forEach((item) => {
      pastSearch.append(` <div class="card">
      <div class="card-body">
          <li>${item.description}</li>
      </div>
    </div>`);
    });
  }

  $.get("/api/searches", { search: search }, function(data) {
    renderPastSearches(data);
  });
});
