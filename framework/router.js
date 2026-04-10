let routes = {};

/**
 * Fallback when no route matches and `/404` is not registered.
 * Plain vnode object (no `RuckyKurung` import) keeps the router module self-contained.
 */
function defaultMissingRoute() {
  return {
    tag: "div",
    props: { class: "page not-found" },
    children: [
      { tag: "h1", props: {}, children: ["Not found"] },
      {
        tag: "p",
        props: { class: "muted" },
        children: [
          "Register a ",
          hCode("/404"),
          " route or add the current pathname to ",
          hCode("RuckyPeta"),
          ".",
        ],
      },
    ],
  };
}

function hCode(text) {
  return { tag: "code", props: {}, children: [text] };
}

function defaultMissingRouteComponent() {
  return defaultMissingRoute();
}

export function RuckyPeta(routeConfig) {
  routes = routeConfig;
}

export function RuckyHalaman() {
  const path = window.location.pathname;
  const handler = routes[path] ?? routes["/404"];
  return handler ?? defaultMissingRouteComponent;
}

/**
 * Client-side navigation. `pushState` does not emit a native `popstate`;
 * a synthetic `popstate` is dispatched so the same listeners run as for back/forward.
 */
export function RuckyCus(path) {
  history.pushState({}, "", path);
  queueMicrotask(() => {
    window.dispatchEvent(new Event("popstate"));
  });
}