import { createMarkUp } from "./createMarkUp";

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
  const el = document.createElement("div");
  document.body.append(el);

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
    expect(document.body.querySelectorAll("input").length).toBe(1);
  });
  it("has one button", () => {
    expect(document.body.querySelectorAll("button").length).toBe(1);
  });
  it("shows local weather", () => {
    expect(rslt.innerHTML).toMatch(/Moscow/);
  });
  it("has map", () => {
    console.log(map.innerHTML);
    expect(!!map).toBe(true);
  });
  it("has history", () => {
    expect(!!hist).toBe(true);
  });
  it("saves only last 10 requests at localStora", async () => {
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i <= 15; i += 1) {
      await button.click();
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
});
