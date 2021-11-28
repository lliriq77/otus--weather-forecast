import { readHistory } from "./readHistory";

describe("readHistory", () => {
  it("recieves history list", () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), "getItem");
    readHistory();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(readHistory()).toBeInstanceOf(Object);
  });
});
