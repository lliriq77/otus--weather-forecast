import { createMarkUp } from "./createMarkUp";

describe("createMarkUp", () => {
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
  beforeAll(async () => {
    const el = document.createElement("div");
    document.body.append(el);
    await createMarkUp(el);
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
    expect(!!map).toBe(true);
  });
  it("has history", () => {
    expect(!!hist).toBe(true);
  });
});
