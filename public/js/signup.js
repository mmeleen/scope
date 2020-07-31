$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var usernameInput = $("input#username-input");
  var nameInput = $("input#name-input");
  var passwordInput = $("input#password-input");
  var DOBInput = $("input#DOB-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();

    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      name: nameInput.val().trim(),
      DOB: DOBInput.val().trim(),
    };
    console.log(userData);
    if (
      !userData.username ||
      !userData.password ||
      !userData.name ||
      !userData.DOB
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.username,
      userData.password,
      userData.name,
      userData.DOB
    );
    usernameInput.val("");
    nameInput.val("");
    passwordInput.val("");
    DOBInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors

  function signUpUser(username, password, name, DOB) {
    $.post("/api/signup", {
      username: username,
      password: password,
      name: name,
      DOB: DOB,
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log(err.responseJSON);
    $("#alert .msg").text(err.responseJSON.errors[0].message);
    $("#alert").fadeIn(500);
  }
});
