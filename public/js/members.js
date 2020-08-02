$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var pastSearch = $('.scope-list');

  $.get('/api/user_data').then(function (data) {
    $('#member-name').text(data.name);
    $('#member-sign').text(data.sign);
    $('#member-img').attr('src', 'assets/' + data.sign + '.png');
  });

  $.get('/api/allHoroscopes/', function (results) {
    // console.log(results);

    $('#yesterdays-date').text(results.yesterday.current_date);
    $('#todays-date').text(results.today.current_date);
    $('#tomorrows-date').text(results.tomorrow.current_date);

    //adding three day forecast
    $('#yesterdays-description').text(results.yesterday.description);
    $('#todays-description').text(results.today.description);
    $('#tomorrows-description').text(results.tomorrow.description);
    //lucky numbers
    $('#lucky-number-yd').text(results.yesterday.lucky_number);
    $('#lucky-number-td').text(results.today.lucky_number);
    $('#lucky-number-tm').text(results.tomorrow.lucky_number);
    //lucky time
    $('#lucky-time-yd').text(results.yesterday.lucky_time);
    $('#lucky-time-td').text(results.today.lucky_time);
    $('#lucky-time-tm').text(results.tomorrow.lucky_time);
    //lucky time
    $('#mood-yd').text(results.yesterday.mood);
    $('#mood-td').text(results.today.mood);
    $('#mood-tm').text(results.tomorrow.mood);

    // adding color blocks to page
    var yesColor = results.yesterday.color;
    var todColor = results.today.color;
    var tomColor = results.tomorrow.color;

    // console.log(yesColor);
    var colorContainerYes = $('<div>').css({
      'background-color': yesColor,
      height: '40px',
      width: '40px',
    });
    $('#yesterdays-color').text(yesColor);
    $('#color-oyd').append(colorContainerYes);

    // console.log(todColor);
    var colorContainerTod = $('<div>').css({
      'background-color': todColor,
      height: '40px',
      width: '40px',
    });
    $('#todays-color').text(todColor);
    $('#color-otd').append(colorContainerTod);

    // console.log(tomColor);
    var colorContainerTom = $('<div>').css({
      'background-color': tomColor,
      height: '40px',
      width: '40px',
    });
    $('#tomorrows-color').text(tomColor);
    $('#color-otm').append(colorContainerTom);
  });

  //start saving logic
  $('#yes-save').on('click', function (event) {
    event.preventDefault();
    var search = {
      date: $('#yesterdays-date').text(),
      description: $('#yesterdays-description').text(),
      mood: $('#mood-yd').text(),
      color: $('#yesterdays-color').text(),
      lucky_number: $('#lucky-number-yd').text(),
      lucky_time: $('#lucky-time-yd').text(),
    };
    saveToDB(search);
  });

  $('#tod-save').on('click', function (event) {
    event.preventDefault();

    var todsearch = {
      date: $('#todays-date').text(),
      description: $('#todays-description').text(),
      mood: $('#mood-td').text(),
      color: $('#todays-color').text(),
      lucky_number: $('#lucky-number-td').text(),
      lucky_time: $('#lucky-time-td').text(),
    };

    saveToDB(todsearch);
  });

  $('#tom-save').on('click', function (event) {
    event.preventDefault();
    var search = {
      date: $('#tomorrows-date').text(),
      description: $('#tomorrows-description').text(),
      mood: $('#mood-tm').text(),
      color: $('#tomorrows-color').text(),
      lucky_number: $('#lucky-number-tm').text(),
      lucky_time: $('#lucky-time-tm').text(),
    };

    saveToDB(search);
  });

  //function for posting to db
  function saveToDB(search) {

    $.get('api/search/' + search.date, function (response) {
      if (response) {
        $.post('/api/saveSearch', { search: search }, function () {
          renderPastSearches();
        });
      } else {
        // can replace with alert msg for user
        console.log('saved search is not unique');
      }

    });
  }

  //function to append the past searches to the page
  function renderPastSearches() {
    $.get('/api/searches', function (data) {
      pastSearch.html('');
      data.forEach(function (item) {
        console.log(item);
        pastSearch.prepend(
          '<div class="card mx-auto" style="width: 80%; background-color: #f0f5f9;">' +
          '<div class="card-title past-date">' +
          item.date +
          '</div>' +
          '<div class="card-body past-description">' +
          item.description +
          '</div></div>'
        );
      });
    });
  }

  renderPastSearches();
});
