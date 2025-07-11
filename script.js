const form = document.getElementById("form");
const listWeather = document.querySelector(".weather");

const api_key = "LCS933S65DN4M8UGSVMLH2WAW"

const fechImages = async (input,country) => {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input},${country}/next7days?key=${api_key}`)
    const weathers = await response.json();

    return weathers
}


form.addEventListener("submit", async (e) => {
    e.preventDefault()
    listWeather.innerHTML = ""
    let currentDate = new Date()

    console.log(currentDate.getDay())

    let country = ""
    const input = e.target.elements.search.value;

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
      case "Tokyo":
            country = "JAPANESE"
            break;
        case "Los Angeles":
            country = "USA"
            break;
        case "New York":
            country = "USA"
            break;
    }
    

    const fetchWeathers = await fechImages(input,country)

    
    
    const { days } = fetchWeathers
    
    console.log(days)

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const newDays = days
        .map(({ icon, tempmax, tempmin, datetime }) => {
          const date = new Date(datetime);
          
        const dayName = dayNames[date.getDay()];
        return `
        <li>
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
    listWeather.insertAdjacentHTML("beforeend",newDays)
})