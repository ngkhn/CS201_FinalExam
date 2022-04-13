console.log("countries loaded");
console.log(vietnam[0]);

// get elements
let slCountry = document.querySelector("select.country");
let country = document.querySelector("span.c-name");
let flag = document.querySelector("img.c-flag");
let population = document.querySelector("span.population");
let capital = document.querySelector("span.capital");
let region = document.querySelector("span.region");
let currency = document.querySelector("span.currency");
let language = document.querySelector("span.language");
let size = document.querySelector("span.size");

let userInput = document.querySelector('input.username');
let userEmail = document.querySelector('input.email');
let password = document.querySelector('input.password');
let password2 = document.querySelector('input.password-confirm');
let form = document.querySelector('form');


// add event listener
slCountry.addEventListener("change", getCountry);

userInput.addEventListener("blur", checkUsername);
userEmail.addEventListener("blur", checkEmail);
password.addEventListener("blur", checkPassword);
password2.addEventListener("blur", checkConfirmPassword);
form.addEventListener("submit", function(event) {
  checkForm(event);
});


init();

function init()
{
  getCountry();
}




async function getCountry()
{
  // example end point: https://restcountries.com/v3.1/name/vietnam
  try
  {
    //try to fetch data, output if successful
    let data = await fetch(`https://restcountries.com/v3.1/name/${slCountry.value}`)
      .then(res => res.json())
      .then(json => json);
    output(data[0]);
  } catch(e) {
    console.log("there was an errror!");
    console.log(e);
    // if there is an error pass the vietnam[0] object (from vietnam.js)
    // to your output function
    output(vietnam[0]);
  }

}

function output(data)
{
  country.textContent = data.name.common;
  flag.setAttribute("src", data.flags.png);
  population.textContent = data.population.toLocaleString();
  capital.textContent = data.capital[0];
  region.textContent = data.region;
  currency.textContent = Object.keys(data.currencies)[0];
  language.textContent = Object.keys(data.languages)[0];
  size.textContent = data.area.toLocaleString();
}



function checkForm(event) {
  event.preventDefault();
  checkUsername();
  checkEmail();
  checkPassword();
  checkConfirmPassword();
  let errors = document.querySelectorAll('.is-invalid');
  let alert = document.querySelector('.alert');
  if(errors.length === 0) {
    alert.classList.add("alert-success");
    alert.classList.remove("alert-light");
    alert.innerText = "You logged in/got hacked!";
  } else {
    alert.classList.add("alert-danger");
    alert.classList.remove("alert-light");
    alert.classList.remove("alert-danger");
    alert.innerText = "There was an error!";
  }
}


function checkUsername() {
  if(userInput.value.toLowerCase() != username.toLowerCase()) {
    userInput.classList.add("is-invalid");
    userInput.classList.remove("is-valid");
  } else {
    userInput.classList.remove("is-invalid");
    userInput.classList.add("is-valid");
  }
}

function checkEmail() {
  if(userEmail.value == '') {
    userEmail.classList.add("is-invalid");
    userEmail.classList.remove("is-valid");
  } else {
    userEmail.classList.remove("is-invalid");
    userEmail.classList.add("is-valid");
  }
}

function checkPassword() {
  if(password.value != userPassword) {
    password.classList.add("is-invalid");
    password.classList.remove("is-valid");
  } else {
    password.classList.remove("is-invalid");
    password.classList.add("is-valid");
  }
}

function checkConfirmPassword() {
  if(password.value != password2.value) {
    password2.classList.add("is-invalid");
    password2.classList.remove("is-valid");
  } else {
    password2.classList.remove("is-invalid");
    password2.classList.add("is-valid");
  }
}
