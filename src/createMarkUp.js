export async function createMurkUp(el) {
  el.innerHTML = `
<input id='input'>
<button id='button'>Get weather</button>
<div id='rslt'style="font-size: 40px;"></div>
<div id='map' style=""></div>
<div id='hist'style=""></div>
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
    elTwo.innerHTML = `HISTORY:${arr
      .map((item) => `<span style="margin: 2px;">${item}</span>`)
      .reverse()
      .join("")}`;
  }

  async function getWeather(inputValue) {
    const apiKey = "92dae48bac98a7191c6227716a76ac12";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    weather = await response.json();
    return weather;
  }

  async function buttonEvent() {
    await getWeather(input.value || event.target.innerHTML);
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

  function mouseHandler() {
    const result =
      Event.type === "mouseover" && Event.target.localName === "span"
        ? (Event.target.style.background = "lightgray")
        : (Event.target.style.background = "white");
    return result;
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
  hist.addEventListener("click", () => {
    getWeather(event.target.innerHTML);
    buttonEvent();
  });
  hist.addEventListener("mouseover", mouseHandler);
  hist.addEventListener("mouseout", mouseHandler);
}
