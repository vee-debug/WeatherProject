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

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "893f85209adc85644388072cc867bd9e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "893f85209adc85644388072cc867bd9e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
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

searchCity("Palermo");
