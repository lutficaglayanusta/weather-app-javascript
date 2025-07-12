const form = document.getElementById("form");
const listWeather = document.querySelector(".weather");
const container = document.querySelector(".container");

const api_key = "LCS933S65DN4M8UGSVMLH2WAW";
let input = "";
let country = "";
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const fechImages = async (input, country) => {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input},${country}/next7days?key=${api_key}`
  );
  const weathers = await response.json();

  return weathers;
};
container.style.display = "none";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  listWeather.innerHTML = "";
  container.innerHTML = "";
  container.style.display = "flex";

  input = e.target.elements.search.value;

  switch (input) {
    case "İstanbul":
      country = "TURKEY";
      break;
    case "London":
      country = "UK";
      break;
    case "Paris":
      country = "FRANCE";
      break;
    case "Berlin":
      country = "GERMANY";
      break;
    case "Los Angeles":
      country = "USA";
      break;
    case "New York":
      country = "USA";
      break;
  }

  const fetchWeathers = await fechImages(input, country);

  const { days } = fetchWeathers;

  const newDays = days
    .map(({ icon, tempmax, tempmin, datetime }) => {
      const date = new Date(datetime);

      const dayName = dayNames[date.getDay()];
      return `
        <li>
            <p style="display:none;">${datetime}</p>
            <p>${dayName}</p>
            <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${icon}.png" alt="${icon}" width="48" height="48">
            <div style="display:flex;gap:10px;">
                <p>${tempmax}°</p>
                <p>${tempmin}°</p>
            </div>
        </li>
        `;
    })
    .join("");
  listWeather.insertAdjacentHTML("beforeend", newDays);
});
listWeather.addEventListener("click", (e) => {
  container.innerHTML = "";
  if (e.target.nodeName === "LI") {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/${e.target.firstElementChild.textContent}/?key=${api_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        const days = data.days;
        const newDays = days
          .map(
            ({
              humidity,
              feelslike,
              description,
              temp,
              conditions,
              windgust,
              windspeed,
            }) => `
          <p>Description: ${description}</p>
          <ul>
            <li>Temperature:${temp}</li>
            <li>${conditions}</li>
          </ul>
          <ul>
            
            <li>Humidity: ${humidity}</li>
            <li>Feels Like: ${feelslike} </li>
          </ul>
          <ul>
            <li>WindGust: ${windgust}</li>
            <li>WindSpeed: ${windspeed}</li>
          </ul>
        `
          )
          .join("");
        container.insertAdjacentHTML("beforeend", newDays);
      });
  }
});
