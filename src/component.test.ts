/* eslint-disable max-classes-per-file */
import { Component } from "./component";

const sleep = (x: number) => new Promise((r) => setTimeout(r, x));

describe("Component", () => {
  let el: HTMLDivElement;
  beforeEach(() => {
    el = document.createElement("div");
  });

  it("is a class", () => {
    class TestComponent extends Component {
      render() {
        return `<h1>${this.el.innerHTML}</h1>`;
      }
    }
    expect(Component).toBeInstanceOf(Function);
    expect(new TestComponent(el)).toBeInstanceOf(Component);
  });

  it("renders on instantiating", async () => {
    const text = `${Math.random()}`;

    class TestComponent extends Component {
      text = text;

      render() {
        return `<h1>${this.text}</h1>`;
      }
    }
    // eslint-disable-next-line
    new TestComponent(el);
    await sleep(0);

    expect(el.innerHTML).toBe(`<h1>${text}</h1>`);
  });

  it("renders on instantiating with state props", async () => {
    const text = `${Math.random()}`;

    class TestComponent extends Component {
      state = {
        text,
      };

      render() {
        return `<h1>${this.state.text}</h1>`;
      }
    }
    // eslint-disable-next-line
    new TestComponent(el);
    await sleep(0);

    expect(el.innerHTML).toBe(`<h1>${text}</h1>`);
  });

  it("updates component view on setState call", async () => {
    const a = `${Math.random()}`;
    const b1 = `${Math.random()}`;

    class TestComponent extends Component {
      state = {
        a,
        b: b1,
      };

      render() {
        return `${JSON.stringify(this.state)}`;
      }
    }
    const item = new TestComponent(el);
    await sleep(0);

    expect(el.innerHTML).toBe(`${JSON.stringify({ a, b: b1 })}`);

    const b2 = `${Math.random()}`;
    item.setState({ b: b2 });
    expect(el.innerHTML).toBe(`${JSON.stringify({ a, b: b2 })}`);
  });

  it("calls methods based on events definition", async () => {
    const value = Math.floor(Math.random() * 100);

    class TestComponent extends Component {
      state = {
        value,
      };

      increase = () => this.setState({ value: this.state.value + 1 });

      decrease = () => this.setState({ value: this.state.value - 1 });

      events = {
        "click@.inc": this.increase,
        "click@input.dec": this.decrease,
      };

      render() {
        return `
          <h1>${this.state.value}</h1>
          <button class="inc">+</button>
          <input type="button" class="dec" value="-" />
        `;
      }
    }
    const item = new TestComponent(el);
    // const increaseSpy = jest.spyOn(item, 'increase');
    // const decreaseSpy = jest.spyOn(item, 'decrease');
    await sleep(0);

    expect(item.state.value).toBe(value);
    expect((el.querySelector("h1") as HTMLDivElement).innerHTML).toBe(
      `${value}`
    );

    (el.querySelector(".inc") as HTMLButtonElement).dispatchEvent(
      new Event("click")
    );

    // expect(increaseSpy).toHaveBeenCalled();
    expect(item.state.value).toBe(value + 1);
    expect((el.querySelector("h1") as HTMLDivElement).innerHTML).toBe(
      `${value + 1}`
    );

    (el.querySelector(".dec") as HTMLButtonElement).dispatchEvent(
      new Event("click")
    );
    (el.querySelector(".dec") as HTMLButtonElement).dispatchEvent(
      new Event("click")
    );
    expect(item.state.value).toBe(value - 1);
    expect((el.querySelector("h1") as HTMLDivElement).innerHTML).toBe(
      `${value - 1}`
    );
  });
});
