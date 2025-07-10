
const api_key = "LCS933S65DN4M8UGSVMLH2WAW"

const fechImages = async () => {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/İstanbul,TURKEY?key=${api_key}`)
    const weathers = await response.json();

    console.log(weathers);
}
fechImages()