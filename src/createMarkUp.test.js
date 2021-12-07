import { createMarkUp } from "./createMarkUp";
import { sleep } from "./sleep";

describe("createMarkUp", () => {
  const saveFetch = global.fetch;
  const saveLocalStorage = global.localStorage;
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
    })
  );

  class LocalStorageMock {
    constructor() {
      this.store = {};
    }

    clear() {
      this.store = {};
    }

    getItem(key) {
      return this.store[key] || null;
    }

    setItem(key, value) {
      this.store[key] = value;
    }

    removeItem(key) {
      delete this.store[key];
    }
  }

  global.localStorage = new LocalStorageMock();
  const div = document.createElement("div");
  document.body.append(div);
  const el = document.querySelector("div");

  beforeAll(async () => {
    await createMarkUp(el);
  });

  afterAll(() => {
    global.fetch = saveFetch;
    global.localStorage = saveLocalStorage;
  });

  it("is a function", () => {
    expect(createMarkUp).toBeInstanceOf(Function);
  });
  it("has one input", () => {
    expect(el.querySelectorAll("input").length).toBe(1);
  });
  it("has one button", () => {
    expect(el.querySelectorAll("button").length).toBe(1);
  });
  it("shows local weather", () => {
    expect(rslt.innerHTML).toMatch(/Moscow/);
  });
  it("has map", () => {
    expect(!!map).toBe(true);
  });
  it("has history", () => {
    expect(!!hist).toBe(true);
  });
  it("saves last 10 localStorage requests", async () => {
    rslt.innerHTML = "";
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i <= 20; i += 1) {
      button.click();
      await sleep();
    }
    /* eslint-enable no-await-in-loop */
    expect(el.querySelectorAll("span").length).toBe(10);
  });

  it("changes background color to lightgray on mouseover", () => {
    el.querySelector("span").dispatchEvent(
      new MouseEvent("mouseover", {
        bubbles: true,
      })
    );
    expect(el.querySelector("span").style.background).toBe("lightgray");
  });

  it("changes background color to white on mouseout", () => {
    el.querySelector("span").dispatchEvent(
      new MouseEvent("mouseout", {
        bubbles: true,
      })
    );
    expect(el.querySelector("span").style.background).toBe("white");
  });

  it("shows current weather in history city after mouse click", async () => {
    rslt.innerHTML = "";
    el.querySelector("span").dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
      })
    );
    await sleep();
    expect(rslt.innerHTML).toMatch(/Moscow/);
  });
});
