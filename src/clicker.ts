import { Component } from "./component";

export class Clicker extends Component {
  state = {
    value: 1,
    input: "123",
  };

  increaseCounter = () =>
    this.setState({
      value: this.state.value + 1,
    });

  decreaseCounter = () =>
    this.setState({
      value: this.state.value + 1,
    });

  setInputValue = (ev: Event) => {
    this.setState({
      input: (ev.target as HTMLInputElement).value,
    });
  };

  events = {
    "click@button.inc": this.increaseCounter,
    "click@button.dec": this.decreaseCounter,
    "change@input": this.setInputValue,
  };

  render() {
    return `
      <h1>Count ${this.state.value} (${this.state.input})</h1>
      <input value="${this.state.input}"  />
      <button class="dec">-</button>
      <button class="inc">+</button>
    `;
  }
}

// new Clicker(document.getElementById("app") as HTMLElement);
// new Clicker(document.getElementById("app2") as HTMLElement, {
//   value: 5,
//   input: "Hola"
// });
