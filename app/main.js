import { RuckyTampil } from "../framework/render.js";
import { RuckyPeta, RuckyHalaman } from "../framework/router.js";
import { RuckyInit, RuckyNguping } from "../framework/state.js";
import { Layout } from "./layout.js";
import { Home } from "./pages/home.js";
import { Docs } from "./pages/docs.js";
import { Examples } from "./pages/examples.js";
import { NotFound } from "./pages/notFound.js";

const app = document.getElementById("app");
if (!app) {
  throw new Error('[rucky] Mount element "#app" was not found in the document.');
}

/** Global state: keys used by the Examples route (isolated from the home landing page). */
RuckyInit({
  exCounter: 0,
  exText: "",
  exOpen: false,
});

RuckyPeta({
  "/": Home,
  "/docs": Docs,
  "/examples": Examples,
  "/404": NotFound,
});

/** Root UI: persistent layout; inner content follows the active route. */
function Root() {
  const Page = RuckyHalaman();
  return Layout(Page());
}

let lastPathname = window.location.pathname;

function rerender() {
  const path = window.location.pathname;
  if (path !== lastPathname) {
    lastPathname = path;
    window.scrollTo(0, 0);
  }
  RuckyTampil(Root, app);
}

RuckyNguping(rerender);
window.addEventListener("popstate", rerender);

rerender();
