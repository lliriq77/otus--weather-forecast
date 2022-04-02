import { Weather } from "./createMarkUp";
import { sleep } from "./sleep";

describe("createMarkUp", () => {
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

  beforeAll(async () => {
    // eslint-disable-next-line
    new Weather(el);
    await sleep(0);
  });

  afterAll(() => {
    global.fetch = saveFetch;
  });

  it("has one input", () => {
    expect(el.querySelectorAll("input").length).toBe(1);
  });

  it("has one button", () => {
    expect(el.querySelectorAll("button").length).toBe(1);
  });

  it("shows local weather", () => {
    expect(div.innerHTML).toMatch(/Moscow/);
  });

  it("has map", () => {
    expect(!!el.querySelectorAll("div")[1]).toBe(true);
  });

  it("has history", () => {
    expect(!!el.querySelectorAll("div")[2]).toBe(true);
  });

  it("saves last 10 localStorage requests", async () => {
    const btn = el.querySelector("button") as HTMLButtonElement;
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i <= 20; i += 1) {
      btn.click();
      await sleep(0);
    }
    /* eslint-enable no-await-in-loop */
    expect(el.querySelectorAll("span").length).toBe(10);
  });

  it("shows current weather in history city after mouse click", async () => {
    const elDiv = el.querySelector("div") as HTMLDivElement;
    elDiv.innerHTML = "";
    el.querySelectorAll("span")[0].dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
      })
    );
    await sleep(0);

    const elDiv2 = el.querySelector("div") as HTMLDivElement;
    expect(elDiv2.innerHTML).toMatch(/Moscow/);
  });
});
