export async function getWeather(inputValue) {
  const apiKey = "92dae48bac98a7191c6227716a76ac12";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const weather = await response.json();
  return weather;
}
