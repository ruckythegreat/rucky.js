import { RuckyKurung } from "../../framework/h.js";
import { RuckyCus } from "../../framework/router.js";
import { RuckyCek, RuckyGas } from "../../framework/state.js";
import { counterLine } from "../components/counterLine.js";

/**
 * Code sample card: static snippet plus a live demo vnode.
 */
function exampleCard(label, source, demoVnode) {
  return RuckyKurung("section", { class: "card example-card" }, [
    RuckyKurung("h3", {}, [label]),
    RuckyKurung("pre", { class: "code-block" }, [RuckyKurung("code", {}, [source])]),
    RuckyKurung("div", { class: "example-demo" }, [demoVnode]),
  ]);
}

/**
 * Runnable patterns: isolated state keys, controlled input, router, file-based helpers.
 */
export function Examples() {
  const { exCounter, exText, exOpen } = RuckyCek();

  function bumpExampleCounter() {
    const s = RuckyCek();
    RuckyGas({ exCounter: s.exCounter + 1 });
  }

  function onInput(e) {
    RuckyGas({ exText: e.target.value });
  }

  function togglePanel() {
    const s = RuckyCek();
    RuckyGas({ exOpen: !s.exOpen });
  }

  return RuckyKurung("div", { class: "page examples-page" }, [
    RuckyKurung("h1", {}, ["Examples"]),
    RuckyKurung("p", { class: "lead" }, [
      "This page uses dedicated state keys (",
      RuckyKurung("code", {}, ["exCounter"]),
      ", ",
      RuckyKurung("code", {}, ["exText"]),
      ", ",
      RuckyKurung("code", {}, ["exOpen"]),
      ") so demos stay isolated from other routes. Read with ",
      RuckyKurung("code", {}, ["RuckyCek()"]),
      ", write with ",
      RuckyKurung("code", {}, ["RuckyGas"]),
      "; subscribers trigger ",
      RuckyKurung("code", {}, ["RuckyTampil"]),
      ".",
    ]),

    exampleCard(
      "1. Feature-scoped state keys",
      `// app/main.js — initial state once
RuckyInit({
  exCounter: 0,
  exText: "",
  exOpen: false,
});

// In this page component:
const { exCounter } = RuckyCek();
RuckyGas({ exCounter: exCounter + 1 });`,
      RuckyKurung("div", {}, [
        RuckyKurung("p", {}, [`exCounter: ${exCounter}`]),
        RuckyKurung(
          "button",
          { type: "button", class: "btn btn-primary", onClick: bumpExampleCounter },
          ["Increment exCounter"]
        ),
      ])
    ),

    exampleCard(
      "2. Controlled input",
      `// Handler receives the native DOM event from addEventListener
function onInput(e) {
  RuckyGas({ exText: e.target.value });
}

return RuckyKurung("input", {
  type: "text",
  value: exText,
  onInput: onInput,
});`,
      RuckyKurung("div", {}, [
        RuckyKurung("label", { class: "field-label", for: "ex-text-input" }, ["Text"]),
        RuckyKurung("input", {
          id: "ex-text-input",
          type: "text",
          class: "text-input",
          value: exText,
          placeholder: "Type here…",
          onInput,
        }),
        RuckyKurung("p", { class: "muted" }, [`Bound value: “${exText}”`]),
      ])
    ),

    exampleCard(
      "3. Programmatic navigation and conditional UI",
      `import { RuckyCus } from "../framework/router.js";

RuckyKurung("button", { onClick: () => RuckyCus("/docs") }, ["Open docs"]);

exOpen
  ? RuckyKurung("div", {}, ["Panel open"])
  : RuckyKurung("p", {}, ["Panel closed"]);`,
      RuckyKurung("div", {}, [
        RuckyKurung("div", { class: "btn-row" }, [
          RuckyKurung(
            "button",
            { type: "button", class: "btn btn-secondary", onClick: togglePanel },
            [exOpen ? "Close panel" : "Open panel"]
          ),
          RuckyKurung(
            "button",
            {
              type: "button",
              class: "btn btn-ghost",
              onClick: () => RuckyCus("/docs"),
            },
            ['RuckyCus("/docs")']
          ),
        ]),
        exOpen
          ? RuckyKurung("div", { class: "callout" }, [
              RuckyKurung("p", {}, [
                "Branch when ",
                RuckyKurung("code", {}, ["exOpen"]),
                " is true — same pattern for drawers, modals, or steps.",
              ]),
            ])
          : RuckyKurung("p", { class: "muted" }, ["Panel is closed — use “Open panel”."]),
      ])
    ),

    exampleCard(
      "4. Component module import",
      `// app/components/counterLine.js
import { RuckyKurung } from "../../framework/h.js";

export function counterLine(label, value) {
  return RuckyKurung("p", { class: "demo-count" }, [\`\${label}: \${value}\`]);
}

// In a page:
import { counterLine } from "../components/counterLine.js";
// vnode usage: counterLine("Demo", exCounter)`,
      RuckyKurung("div", {}, [
        RuckyKurung("p", {}, [
          "Reusable helper from ",
          RuckyKurung("code", {}, ["app/components/counterLine.js"]),
          ", bound to ",
          RuckyKurung("code", {}, ["exCounter"]),
          ":",
        ]),
        counterLine("counterLine()", exCounter),
        RuckyKurung("p", { class: "muted" }, ["Change the value with example 1."]),
      ])
    ),

    RuckyKurung("section", { class: "card" }, [
      RuckyKurung("h2", {}, ["Render pipeline"]),
      RuckyKurung("ol", { class: "doc-list ordered" }, [
        RuckyKurung("li", {}, ["Event handler calls ", RuckyKurung("code", {}, ["RuckyGas"]), "."]),
        RuckyKurung("li", {}, [RuckyKurung("code", {}, ["RuckyGas"]), " merges state and runs each ", RuckyKurung("code", {}, ["RuckyNguping(fn)"]), "."]),
        RuckyKurung("li", {}, ["A subscriber calls ", RuckyKurung("code", {}, ["RuckyTampil(Root, container)"]), "."]),
        RuckyKurung("li", {}, [
          RuckyKurung("code", {}, ["Root"]),
          " calls ",
          RuckyKurung("code", {}, ["RuckyHalaman()"]),
          " and renders the active page inside ",
          RuckyKurung("code", {}, ["Layout"]),
          ".",
        ]),
      ]),
    ]),
  ]);
}
