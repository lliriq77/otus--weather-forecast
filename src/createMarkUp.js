import { readHistory } from "./readHistory";
import { saveHistory } from "./saveHistory";
import { drawHistory } from "./drawHistory";
import { getWeather } from "./getWeather";

export async function createMarkUp(el) {
  el.innerHTML = `
<input>
<button>Get weather</button>
<div></div>
<div></div>
<div></div>
`;

  async function buttonEvent(e) {
    try {
      const weather = await getWeather(input.value || e.target.innerHTML);

      if (weather) {
        const temp = weather.main.temp.toFixed(0);
        const city = weather.name;
        const coord = `${weather.coord.lat},${weather.coord.lon}`;
        const { icon } = weather.weather[0];
        const image = `<image src=https://openweathermap.org/img/wn/${icon}@2x.png>`;
        const mapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coord}&zoom=10&size=500x200&key=${mapsApiKey}`;
        history.push(city);
        saveHistory(history);
        drawHistory(hist, history);
        map.innerHTML = `<image src=${mapsUrl}>`;
        rslt.innerHTML = `<p>${city} ${temp}°C ${image}</p>`;
        input.value = "";
      } else {
        input.value = "";
        throw new Error("Empty weather object");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const input = el.querySelector("input");
  const button = el.querySelector("button");
  const rslt = el.querySelectorAll("div")[0];
  const map = el.querySelectorAll("div")[1];
  const hist = el.querySelectorAll("div")[2];
  let mapsApiKey = "AIzaSyB8_RK8kYbWmDytZkHkg94OyqDtYVk5lGM";
  let history = await readHistory();

  try {
    const localCityResponse = await fetch(
      "https://get.geojs.io/v1/ip/geo.json"
    );

    if (localCityResponse.ok) {
      const localCity = await localCityResponse.json();

      const coord = `${localCity.latitude},${localCity.longitude}`;
      const mapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coord}&zoom=10&size=500x200&key=${mapsApiKey}`;
      map.innerHTML = `<image src=${mapsUrl}>`;

      const weather = await getWeather(localCity.city);
      const temp = weather.main.temp.toFixed(0);
      const city = weather.name;
      const { icon } = weather.weather[0];
      const image = `<image src=https://openweathermap.org/img/wn/${icon}@2x.png>`;

      rslt.innerHTML = `<p>${city} ${temp}°C ${image}</p>`;
      drawHistory(hist, history);
    } else {
      throw new Error("https://get.geojs.io/v1/ip/geo.json OUT OF REACH");
    }
  } catch (err) {
    console.log(err);
  }

  button.addEventListener("click", buttonEvent);

  hist.addEventListener("click", async (e) => {
    buttonEvent(e);
  });

  hist.addEventListener("mouseover", (e) => {
    if (e.target.localName === "span") e.target.style.background = "lightgray";
  });

  hist.addEventListener("mouseout", (e) => {
    if (e.target.localName === "span") e.target.style.background = "white";
  });
}
