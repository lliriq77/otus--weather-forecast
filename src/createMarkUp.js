export async function createMurkUp(el) {
  el.innerHTML = `
<input id='input'>
<button id='button'>Get weather</button>
<div id='rslt'style="position: absolute; left: 50%;"></div>
<div id='hist'style="position: absolute; left: 80%;"></div>
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
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&units=metric&appid=92dae48bac98a7191c6227716a76ac12`;
    const response = await fetch(url);
    const weather = await response.json();
    const temp = weather.list[0].main.temp.toFixed(0);
    const city = weather.city.name;
    const { icon } = weather.list[0].weather[0];
    const image = `<image src=https://openweathermap.org/img/wn/${icon}@2x.png>`;
    history.push(city);
    saveHistory(history);
    drawHistory(hist, history);
    rslt.innerHTML = `${city} ${temp}°C ${image}`;
    input.value = "";
  }
  let history = await readHistory();
  drawHistory(hist, history);
  button.addEventListener("click", getWeather);
}
