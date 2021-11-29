import { saveHistory } from "./saveHistory";

describe("saveHistory", () => {
  it("saves history to localStorage", () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");
    saveHistory([1, 2]);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
