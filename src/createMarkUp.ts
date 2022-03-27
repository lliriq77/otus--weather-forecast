import { Component } from "./component";

export class Weather extends Component {
  map = `map`;

  mapsApiKey = "AIzaSyB8_RK8kYbWmDytZkHkg94OyqDtYVk5lGM";

  history: string[] = [];
  // eslint-disable-next-line
  state: Partial<Record<string, any>> = {
    weather: [
      { id: 600, main: "Snow", description: "light snow", icon: "13n" },
    ],
    name: "",
    longitude: "37.6171",
    city: "Moscow",
    latitude: "55.7483",
    main: { temp: 0 },
    coord: { lon: 37.6156, lat: 55.7522 },
  };

  async onMount(): Promise<void> {
    await this.readLocalData();
    this.el.innerHTML = this.render();
    this.subscribeToEvents();
  }
  // eslint-disable-next-line
  template(tpl: string, data: Record<string, any>): string {
    const tplResult = tpl
      .replace(/{{for (\w+)}}(.+){{endfor}}/g, (word, name, tmpl) => {
        let res = "";

        this.history.forEach((el) => {
          res = `<span>${this.template(tmpl, { name: el })}</span>${res}`;
        });

        return res;
      })
      .replace(/{{(\w+)}}/g, (word, name) => {
        if (name === "NAME") return data.name || "";
        if (name === "TEMP") return data.main.temp || "";
        if (name === "ICON") return data.weather[0].icon || "";
        return data[name];
      });

    return tplResult;
  }

  render() {
    return this.template(
      `<input>
    <button>Get weather</button>
    <div>
    <p>{{NAME}} {{TEMP}}°C</p>
    <image src=https://openweathermap.org/img/wn/{{ICON}}@2x.png>
    </div>
    <div>
    {{MAP}}
    </div>
    <div class=hist>{{for items}}{{NAME}}{{endfor}}</div>`,
      this.state
    );
  }

  readLocalData = async () => {
    try {
      const localCityResponse = await fetch(
        "https://get.geojs.io/v1/ip/geo.json"
      );

      if (localCityResponse.ok) {
        const localCity = await localCityResponse.json();
        const coord = `${localCity.latitude},${localCity.longitude}`;
        this.map = `<image src=https://maps.googleapis.com/maps/api/staticmap?center=${coord}&zoom=10&size=500x200&key=${this.mapsApiKey}>`;

        const weather = await this.getWeather(localCity.city);

        this.setState(weather);
        this.setState({ MAP: this.map });

        this.history = await this.readHistory();
      } else {
        throw new Error("https://get.geojs.io/v1/ip/geo.json OUT OF REACH");
      }
    } catch (err) {
      console.log(err);
    }
  };

  readHistory = async () => {
    const history = localStorage.getItem("history") as string;

    return JSON.parse(history) ?? [];
  };

  saveHistory = (arr: string[]) => {
    if (arr.length > 10) arr.shift();

    localStorage.setItem("history", JSON.stringify(arr));
  };

  getWeather = async (inputValue: string) => {
    const apiKey = "92dae48bac98a7191c6227716a76ac12";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${apiKey}`;
    let weather;

    try {
      const response = await fetch(url);

      if (response.ok) {
        weather = await response.json();
      } else {
        throw new Error("Invalid input");
      }
    } catch (e) {
      console.log(e);
    }

    return weather;
  };

  buttonEvent = async (e: Event) => {
    const evTarget = e.target as HTMLElement;

    try {
      const weather = await this.getWeather(
        this.el.querySelector("input")?.value || evTarget.innerHTML
      );

      if (weather) {
        this.setState(weather);

        const coord = `${weather.coord.lat},${weather.coord.lon}`;

        this.map = `<image src=https://maps.googleapis.com/maps/api/staticmap?center=${coord}&zoom=10&size=500x200&key=${this.mapsApiKey}>`;
        this.setState({ MAP: this.map });

        this.history.push(this.state.name);
        this.saveHistory(this.history);

        this.el.innerHTML = this.render();
        this.subscribeToEvents();
      } else {
        throw new Error("Empty weather object");
      }
    } catch (err) {
      console.log(err);
    }
  };

  events = {
    "click@button": this.buttonEvent,
    "click@.hist": this.buttonEvent,
  };
}
