import { RuckyKurung } from "../../framework/h.js";
import { RuckyCus } from "../../framework/router.js";

/**
 * Route fallback when no handler matches the current pathname.
 */
export function NotFound() {
  return RuckyKurung("div", { class: "page not-found" }, [
    RuckyKurung("h1", {}, ["404"]),
    RuckyKurung("p", { class: "lead" }, [
      "No route registered for this path. Add it to ",
      RuckyKurung("code", {}, ["RuckyPeta"]),
      " or define ",
      RuckyKurung("code", {}, ["/404"]),
      ".",
    ]),
    RuckyKurung(
      "button",
      {
        type: "button",
        class: "btn btn-primary",
        onClick: () => RuckyCus("/"),
      },
      ["Back to home"]
    ),
  ]);
}
