import { readHistory } from "./readHistory";

describe("readHistory", () => {
  it("recieves history list", async () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), "getItem");
    const result = await readHistory();

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Object);
  });
});
