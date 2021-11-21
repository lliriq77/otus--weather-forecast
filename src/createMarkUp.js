export async function createMurkUp(el) {
  el.innerHTML = `
<input id='input'>
<button id='button'>Get weather</button>
<div id='rslt'style="position: absolute; left: 50%;"></div>
<div id='hist'style="position: absolute; left: 80%;"></div>
<div id='map' style="position: absolute; left: 30%; top: 28%"></div>
`;
  async function readHistory() {
    const history = localStorage.getItem("history");
    return JSON.parse(history) ?? [];
  }

  function saveHistory(arr) {
    if (arr.length > 10) arr.shift();
    localStorage.setItem("history", JSON.stringify(arr));
  }

  function drawHistory(elTwo, arr) {
    elTwo.innerHTML = `Requests history:${arr
      .map((item) => `<p>${item}</p>`)
      .reverse()
      .join("")}`;
  }

  async function getWeather() {
    const inputValue = input.value || localCity.city;
    const apiKey = "92dae48bac98a7191c6227716a76ac12";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    weather = await response.json();
    return weather;
  }

  async function buttonEvent() {
    await getWeather();
    temp = weather.list[0].main.temp.toFixed(0);
    city = weather.city.name;
    icon = weather.list[0].weather[0].icon;
    image = `<image src=https://openweathermap.org/img/wn/${icon}@2x.png>`;
    mapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${city}&zoom=10&size=500x200&key=${mapsApiKey}`;
    history.push(city);
    saveHistory(history);
    drawHistory(hist, history);
    map.innerHTML = `<image src=${mapsUrl}>`;
    rslt.innerHTML = `${city} ${temp}°C ${image}`;
    input.value = "";
  }

  let history = await readHistory();
  const localCityResponse = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const localCity = await localCityResponse.json();
  const mapsApiKey = "AIzaSyB8_RK8kYbWmDytZkHkg94OyqDtYVk5lGM";
  let mapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${localCity.city}&zoom=10&size=500x200&key=${mapsApiKey}`;
  map.innerHTML = `<image src=${mapsUrl}>`;
  let weather = await getWeather();
  let temp = weather.list[0].main.temp.toFixed(0);
  let city = weather.city.name;
  let { icon } = weather.list[0].weather[0];
  let image = `<image src=https://openweathermap.org/img/wn/${icon}@2x.png>`;
  rslt.innerHTML = `${city} ${temp}°C ${image}`;

  drawHistory(hist, history);
  button.addEventListener("click", buttonEvent);
}
