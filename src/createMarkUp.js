import { readHistory } from "./readHistory";
import { saveHistory } from "./saveHistory";
import { drawHistory } from "./drawHistory";
import { getWeather } from "./getWeather";

export async function createMarkUp(el) {
  el.innerHTML = `
<input id='input'>
<button id='button'>Get weather</button>
<div id='rslt'style="font-size: 40px;"></div>
<div id='map' style=""></div>
<div id='hist'style=""></div>
`;

  async function buttonEvent(e) {
    weather = await getWeather(input.value || e.target.innerHTML);
    temp = weather.list[0].main.temp.toFixed(0);
    city = weather.city.name;
    coord = `${weather.city.coord.lat},${weather.city.coord.lon}`;
    icon = weather.list[0].weather[0].icon;
    image = `<image src=https://openweathermap.org/img/wn/${icon}@2x.png>`;
    mapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coord}&zoom=10&size=500x200&key=${mapsApiKey}`;
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
  let coord = `${localCity.latitude},${localCity.longitude}`;
  let mapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coord}&zoom=10&size=500x200&key=${mapsApiKey}`;
  map.innerHTML = `<image src=${mapsUrl}>`;
  let weather = await getWeather(localCity.city);
  let temp = weather.list[0].main.temp.toFixed(0);
  let city = weather.city.name;
  let { icon } = weather.list[0].weather[0];
  let image = `<image src=https://openweathermap.org/img/wn/${icon}@2x.png>`;
  rslt.innerHTML = `${city} ${temp}°C ${image}`;
  drawHistory(hist, history);
  button.addEventListener("click", buttonEvent);
  hist.addEventListener("click", (e) => {
    getWeather(e.target.innerHTML);
    buttonEvent(e);
  });
  hist.addEventListener("mouseover", (e) => {
    if (e.target.localName === "span") e.target.style.background = "lightgray";
  });
  hist.addEventListener("mouseout", (e) => {
    if (e.target.localName === "span") e.target.style.background = "white";
  });
}
