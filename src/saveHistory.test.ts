import { Weather } from "./createMarkUp";
import { sleep } from "./sleep";

describe("saveHistory", () => {
  const saveFetch = global.fetch;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json() {
        return Promise.resolve({
          weather: [
            { id: 600, main: "Snow", description: "light snow", icon: "13n" },
          ],
          name: "Moscow",
          longitude: "37.6171",
          city: "Moscow",
          latitude: "55.7483",
          main: { temp: 5.45 },
          coord: { lon: 37.6156, lat: 55.7522 },
        });
      },
      ok: true,
    } as Response)
  );

  const div = document.createElement("div");
  document.body.append(div);
  const el = document.querySelector("div") as HTMLDivElement;

  afterAll(() => {
    global.fetch = saveFetch;
  });

  it("saves history to localStorage", async () => {
    const weather = new Weather(el);

    await sleep(0);

    jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");
    weather.saveHistory(["1", "2"]);

    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
