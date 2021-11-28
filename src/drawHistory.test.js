import { drawHistory } from "./drawHistory";

describe("drawHistory", () => {
  it("draws history list", () => {
    const el = document.createElement("div");
    document.body.append(el);
    const arr = ["Moscow", "Berlin"];
    drawHistory(el, arr);
    expect(document.querySelector("div").innerHTML).toMatch(
      /Berlin.{30,40}Moscow/
    );
  });
});
