import { createMarkUp } from "./createMarkUp";

describe("createMarkUp", () => {
  createMarkUp(document.body);
  it("is a function", () => {
    expect(createMarkUp).toBeInstanceOf(Function);
  });
  it("has one input", () => {
    expect(document.body.querySelectorAll("input").length).toBe(1);
  });
  it("has one button", () => {
    expect(document.body.querySelectorAll("button").length).toBe(1);
  });
  /* it('shows local weather', () => {
    expect(rslt.innerHTML).toMatch(/Moscow/);
  }); */
  it("has map", () => {
    expect(!!map).toBe(true);
  });
  it("has history", () => {
    expect(!!hist).toBe(true);
  });
});
