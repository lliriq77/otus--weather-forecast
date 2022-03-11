export abstract class Component<State = Record<string, unknown>> {
  state: State;

  el: HTMLElement;

  events: Record<string, (ev: Event) => void> = {};

  constructor(el: HTMLElement) {
    this.el = el;
    setTimeout(() => {
      this.el.innerHTML = this.render();
      this.subscribeToEvents();
    }, 0);
  }

  render() {
    return `${this.el.innerHTML}`;
  }

  setState(obj: Partial<State>) {
    this.state = { ...this.state, ...obj };
    this.el.innerHTML = this.render();
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    Object.entries(this.events).forEach(([key, value]) => {
      const evName = key.split("@", 1).toString();
      const selector = key.split("@").splice(1, 1).toString();

      this.el.querySelector(selector)?.addEventListener(evName, value);
    });
  }
}
