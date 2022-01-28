function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return `${days[dayIndex]} ${hours}:${minutes}`;
}

function displayCurrentTemperature(response) {
  fahrenheitTemp = response.data.main.temp;
  document.querySelector("h1").innerHTML = Math.round(fahrenheitTemp);
  document.querySelector("h3").innerHTML = `in ${response.data.name}`;
  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-conditions").innerHTML = Math.round(
    response.data.wind.speed
  );
  fahrenheitMax = response.data.main.temp_max;
  document.querySelector("#temp-max").innerHTML = `${Math.round(
    fahrenheitMax
  )}°`;
  fahrenheitMin = response.data.main.temp_min;
  document.querySelector("#temp-min").innerHTML = `${Math.round(
    fahrenheitMin
  )}°`;
}

function searchCity(city) {
  let apiKey = "ed1ad0d4f5bbf7823ad1cdd74e7abf8c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayCurrentTemperature);
}

function conductSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  searchCity(cityInput.value);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", conductSearch);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", conductSearch);

searchCity("Palermo");

let fahrenheitTemp = null;
let fahrenheitMax = null;
let fahrenheitMin = null;

function displayCelsiusTemperatures(event) {
  event.preventDefault();
  fahrenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");
  let celsiusTemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  document.querySelector("h1").innerHTML = celsiusTemp;
  let celsiusMax = `${Math.round(((fahrenheitMax - 32) * 5) / 9)}°`;
  document.querySelector("#temp-max").innerHTML = celsiusMax;
  let celsiusMin = `${Math.round(((fahrenheitMin - 32) * 5) / 9)}°`;
  document.querySelector("#temp-min").innerHTML = celsiusMin;
}

let celsiusButton = document.querySelector("#celsius-link");
celsiusButton.addEventListener("click", displayCelsiusTemperatures);

function displayFahrenheitTemperatures(event) {
  event.preventDefault();
  celsiusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");
  document.querySelector("h1").innerHTML = Math.round(fahrenheitTemp);
  document.querySelector("#temp-max").innerHTML = `${Math.round(
    fahrenheitMax
  )}°`;
  document.querySelector("#temp-min").innerHTML = `${Math.round(
    fahrenheitMin
  )}°`;
}

let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", displayFahrenheitTemperatures);

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
