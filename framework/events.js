window.__events = {};

export function RuckyEvent(name, fn) {
  window.__events[name] = fn;
}