// eslint-disable-next-line
export abstract class Component<State = Record<string, any>> {
  state: Partial<State> = {};

  el: HTMLElement;

  events: Record<string, (ev: Event) => void> = {};

  constructor(el: HTMLElement, state?: Partial<State>) {
    this.el = el;
    this.state = state ?? {};
    setTimeout(() => {
      this.onMount();
    }, 0);
  }

  render() {
    return `${this.el.innerHTML}`;
  }

  onMount() {
    this.el.innerHTML = this.render();
    this.subscribeToEvents();
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
