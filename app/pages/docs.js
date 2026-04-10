import { RuckyKurung } from "../../framework/h.js";
import { RuckyCus } from "../../framework/router.js";

function scrollToDocSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

/**
 * Tautan sidebar (scroll in-page; hash disinkronkan untuk bookmark).
 */
function tocLink(id, label) {
  return RuckyKurung(
    "a",
    {
      class: "docs-toc-link",
      href: `#${id}`,
      onClick: (e) => {
        e.preventDefault();
        scrollToDocSection(id);
      },
    },
    [label]
  );
}

function tocGroup(title, links) {
  return RuckyKurung("div", { class: "docs-toc-group" }, [
    RuckyKurung("div", { class: "docs-toc-group-title" }, [title]),
    RuckyKurung("nav", { class: "docs-toc-list" }, links),
  ]);
}

/** Konten referensi: judul + isi (tanpa wrapper card agar tipografi dokumen lebih bersih). */
function docBlock(title, id, body) {
  return RuckyKurung("section", { class: "docs-section", id }, [
    RuckyKurung("h2", { class: "docs-section-title" }, [title]),
    ...body,
  ]);
}

function codeBlock(source) {
  return RuckyKurung("pre", { class: "code-block docs-code" }, [RuckyKurung("code", {}, [source])]);
}

function note(title, paragraphs) {
  return RuckyKurung("div", { class: "docs-note" }, [
    RuckyKurung("div", { class: "docs-note-title" }, [title]),
    ...paragraphs,
  ]);
}

function apiTable(rows) {
  return RuckyKurung("div", { class: "docs-table-wrap" }, [
    RuckyKurung("table", { class: "api-table" }, [
      RuckyKurung("thead", {}, [
        RuckyKurung("tr", {}, [
          RuckyKurung("th", {}, ["Module"]),
          RuckyKurung("th", {}, ["Export"]),
          RuckyKurung("th", {}, ["Description"]),
        ]),
      ]),
      RuckyKurung(
        "tbody",
        {},
        rows.map(([mod, fn, desc]) =>
          RuckyKurung("tr", {}, [
            RuckyKurung("td", {}, [RuckyKurung("code", {}, [mod])]),
            RuckyKurung("td", {}, [RuckyKurung("code", {}, [fn])]),
            RuckyKurung("td", {}, [desc]),
          ])
        )
      ),
    ]),
  ]);
}

function importPathTable(rows) {
  return RuckyKurung("div", { class: "docs-table-wrap" }, [
    RuckyKurung("table", { class: "api-table" }, [
      RuckyKurung("thead", {}, [
        RuckyKurung("tr", {}, [
          RuckyKurung("th", {}, ["Location"]),
          RuckyKurung("th", {}, ["Import"]),
          RuckyKurung("th", {}, ["Resolves to"]),
        ]),
      ]),
      RuckyKurung(
        "tbody",
        {},
        rows.map(([loc, imp, target]) =>
          RuckyKurung("tr", {}, [
            RuckyKurung("td", {}, [RuckyKurung("code", {}, [loc])]),
            RuckyKurung("td", {}, [RuckyKurung("code", {}, [imp])]),
            RuckyKurung("td", {}, [target]),
          ])
        )
      ),
    ]),
  ]);
}

function fileTree(lines) {
  return RuckyKurung("pre", { class: "code-block docs-code docs-file-tree" }, [
    RuckyKurung("code", {}, [lines.join("\n")]),
  ]);
}

/**
 * Halaman dokumentasi referensi: layout sidebar + konten, nada netral.
 */
export function Docs() {
  const sidebar = RuckyKurung("aside", { class: "docs-sidebar", "aria-label": "On this page" }, [
    RuckyKurung("div", { class: "docs-sidebar-sticky" }, [
      RuckyKurung("div", { class: "docs-sidebar-label" }, ["On this page"]),
      tocGroup("Overview", [
        tocLink("doc-overview", "Introduction"),
        tocLink("doc-install", "Installation"),
        tocLink("doc-concepts", "Concepts"),
      ]),
      tocGroup("Application", [tocLink("doc-app", "Directory app/")]),
      tocGroup("Reference", [
        tocLink("doc-api-index", "API overview"),
        tocLink("doc-rucky-kurung", "RuckyKurung()"),
        tocLink("doc-state", "State"),
        tocLink("doc-RuckyTampil", "Render"),
        tocLink("doc-router", "Router"),
        tocLink("doc-events", "Events"),
      ]),
      tocGroup("Tooling", [
        tocLink("doc-server", "Dev server"),
        tocLink("doc-cli", "create-app"),
        tocLink("doc-limitations", "Limitations"),
      ]),
      RuckyKurung("div", { class: "docs-toc-footer" }, [
        RuckyKurung(
          "a",
          {
            class: "docs-toc-examples",
            href: "/examples",
            onClick: (e) => {
              e.preventDefault();
              RuckyCus("/examples");
            },
          },
          ["Examples →"]
        ),
      ]),
    ]),
  ]);

  const content = RuckyKurung("div", { class: "docs-content" }, [
    RuckyKurung("header", { class: "docs-header" }, [
      RuckyKurung("h1", {}, ["Documentation"]),
      RuckyKurung("p", { class: "docs-lead" }, [
        "Reference for the Rucky.js runtime: ",
        RuckyKurung("code", {}, ["framework/"]),
        " modules, ",
        RuckyKurung("code", {}, ["app/"]),
        " application layout, static assets, and the development server. ",
        "Runnable patterns are listed under ",
        RuckyKurung(
          "a",
          {
            class: "text-link",
            href: "/examples",
            onClick: (e) => {
              e.preventDefault();
              RuckyCus("/examples");
            },
          },
          ["Examples"]
        ),
        ".",
      ]),
    ]),

    docBlock("Introduction", "doc-overview", [
      RuckyKurung("p", {}, [
        "Rucky.js is a minimal client runtime: vnode factories, a single global store with subscribers, ",
        "a DOM reconciler, and a pathname-based router. ",
        "There is no build step; the browser loads ES modules directly.",
      ]),
    ]),

    docBlock("Installation", "doc-install", [
      RuckyKurung("p", {}, [
        "Clone or copy the repository. From the project root:",
      ]),
      codeBlock("node server.js"),
      RuckyKurung("p", {}, [
        "Open ",
        RuckyKurung("code", {}, ["http://localhost:3000"]),
        ". Entry HTML is ",
        RuckyKurung("code", {}, ["public/index.html"]),
        "; the application module is ",
        RuckyKurung("code", {}, ["/app/main.js"]),
        ".",
      ]),
      RuckyKurung("p", {}, [
        "Scaffold a new project (copies ",
        RuckyKurung("code", {}, ["template/app"]),
        " plus ",
        RuckyKurung("code", {}, ["framework/"]),
        ", ",
        RuckyKurung("code", {}, ["public/"]),
        ", ",
        RuckyKurung("code", {}, ["server.js"]),
        ", ",
        RuckyKurung("code", {}, ["utils.js"]),
        ", ",
        RuckyKurung("code", {}, ["package.json"]),
        "):",
      ]),
      codeBlock("node create-app.js <project-name>\ncd <project-name>\nnode server.js"),
    ]),

    docBlock("Concepts", "doc-concepts", [
      RuckyKurung("p", {}, [
        "UI is described as a tree of plain objects ",
        RuckyKurung("code", {}, ["{ tag, props, children }"]),
        " produced by ",
        RuckyKurung("code", {}, ["RuckyKurung()"]),
        ". ",
        RuckyKurung("code", {}, ["RuckyTampil(component, container)"]),
        " invokes ",
        RuckyKurung("code", {}, ["component()"]),
        ", diffs against the previous tree, and updates the DOM.",
      ]),
      RuckyKurung("p", {}, [
        "Data flow: global state → component functions return vnodes → ",
        RuckyKurung("code", {}, ["RuckyTampil"]),
        " patches the DOM. User input calls ",
        RuckyKurung("code", {}, ["RuckyGas"]),
        "; registered subscribers (typically one that calls ",
        RuckyKurung("code", {}, ["RuckyTampil"]),
        ") run again.",
      ]),
      codeBlock(`// app/main.js (pattern)
RuckyInit({ /* initial */ });
RuckyPeta({ "/": PageA, "/docs": PageB, "/404": NotFound });
RuckyNguping(() => RuckyTampil(Root, mount));
window.addEventListener("popstate", () => RuckyTampil(Root, mount));
RuckyTampil(Root, mount);`),
    ]),

    docBlock("Directory app/", "doc-app", [
      RuckyKurung("p", {}, [
        "The ",
        RuckyKurung("code", {}, ["app/"]),
        " directory holds application code only. ",
        RuckyKurung("code", {}, ["framework/"]),
        " stays independent so the same core can ship with multiple apps or templates.",
      ]),
      fileTree([
        "app/",
        "├── main.js          # entry: state, router, RuckyNguping, Root, first render",
        "├── layout.js        # shell: header, primary nav, footer; wraps active route",
        "├── components/      # reusable vnode builders (presentational helpers)",
        "│   └── counterLine.js",
        "└── pages/           # route-level components (one module per screen)",
        "    ├── home.js",
        "    ├── docs.js",
        "    ├── examples.js",
        "    └── notFound.js",
      ]),
      RuckyKurung("h3", { class: "docs-subheading" }, ["main.js"]),
      RuckyKurung("p", {}, [
        "Bootstraps the app: resolves the DOM mount, initializes ",
        RuckyKurung("code", {}, ["RuckyInit"]),
        ", registers routes with ",
        RuckyKurung("code", {}, ["RuckyPeta"]),
        ", subscribes a function that calls ",
        RuckyKurung("code", {}, ["RuckyTampil(Root, mount)"]),
        ", listens for ",
        RuckyKurung("code", {}, ["popstate"]),
        ", and performs the initial render.",
      ]),
      note("Contract", [
        RuckyKurung("p", {}, [
          "Exactly one ",
          RuckyKurung("code", {}, ["RuckyNguping"]),
          " callback should invoke ",
          RuckyKurung("code", {}, ["RuckyTampil"]),
          " for the main tree to avoid duplicate patches.",
        ]),
      ]),
      RuckyKurung("h3", { class: "docs-subheading" }, ["layout.js"]),
      RuckyKurung("p", {}, [
        "Exports ",
        RuckyKurung("code", {}, ["Layout(pageVnode)"]),
        ". ",
        "It wraps the active page (vnode) with global chrome: brand, primary navigation using ",
        RuckyKurung("code", {}, ["RuckyCus"]),
        ", and footer. ",
        "Route changes do not remount the shell; only the inner page subtree is driven by ",
        RuckyKurung("code", {}, ["RuckyHalaman()"]),
        " inside ",
        RuckyKurung("code", {}, ["Root"]),
        ".",
      ]),
      RuckyKurung("h3", { class: "docs-subheading" }, ["pages/"]),
      RuckyKurung("p", {}, [
        "Each file exports a component function ",
        RuckyKurung("code", {}, ["export function PageName() { return RuckyKurung(...); }"]),
        ". ",
        "The mapping from URL pathname to component is defined in ",
        RuckyKurung("code", {}, ["RuckyPeta({ ... })"]),
        " inside ",
        RuckyKurung("code", {}, ["main.js"]),
        ". ",
        "Adding a route: create the module under ",
        RuckyKurung("code", {}, ["pages/"]),
        ", import it in ",
        RuckyKurung("code", {}, ["main.js"]),
        ", add an entry to the router object, and optionally add a nav link in ",
        RuckyKurung("code", {}, ["layout.js"]),
        ".",
      ]),
      RuckyKurung("h3", { class: "docs-subheading" }, ["components/"]),
      RuckyKurung("p", {}, [
        "Optional modules that export functions returning vnodes (or fragments of the tree). ",
        "They may call ",
        RuckyKurung("code", {}, ["RuckyKurung"]),
        " with import path ",
        RuckyKurung("code", {}, ["../../framework/h.js"]),
        " from ",
        RuckyKurung("code", {}, ["app/components/"]),
        ". ",
        "Pages import them with ",
        RuckyKurung("code", {}, ["../components/..."]),
        " relative to ",
        RuckyKurung("code", {}, ["pages/"]),
        ".",
      ]),
      RuckyKurung("h3", { class: "docs-subheading" }, ["Import paths from app/"]),
      importPathTable([
        ["app/main.js", "../framework/*.js", "framework/ at repository root"],
        ["app/layout.js", "../framework/*.js", "framework/ at repository root"],
        ["app/pages/*.js", "../../framework/*.js", "framework/ at repository root"],
        ["app/components/*.js", "../../framework/*.js", "framework/ at repository root"],
      ]),
    ]),

    docBlock("API overview", "doc-api-index", [
      RuckyKurung("p", {}, [
        "All public exports live under ",
        RuckyKurung("code", {}, ["framework/*.js"]),
        ".",
      ]),
      apiTable([
        ["h.js", "RuckyKurung(tag, props?, children?)", "VNode factory; normalizes children to an array."],
        ["state.js", "RuckyInit(obj)", "Replaces the entire initial state object."],
        ["state.js", "RuckyCek()", "Returns the current state reference."],
        ["state.js", "RuckyGas(partial)", "Shallow merge; notifies all subscribers."],
        ["state.js", "RuckyNguping(fn)", "Registers a listener; no built-in unsubscribe."],
        ["render.js", "RuckyTampil(component, container)", "Mounts or diffs the component tree."],
        ["router.js", "RuckyPeta(map)", "Stores pathname → component function."],
        ["router.js", "RuckyHalaman()", "Resolves the handler for the current path."],
        ["router.js", "RuckyCus(path)", "history.pushState + synthetic popstate."],
        ["events.js", "RuckyEvent(name, fn)", "Stores a handler on window.__events (extensibility hook)."],
      ]),
    ]),

    docBlock("RuckyKurung()", "doc-rucky-kurung", [
      RuckyKurung("p", {}, [
        "Signature: ",
        RuckyKurung("code", {}, ["RuckyKurung(tag, props = {}, children = [])"]),
        ". ",
        "Returns ",
        RuckyKurung("code", {}, ["{ tag, props, children }"]),
        ".",
      ]),
      codeBlock(`import { RuckyKurung } from "../framework/h.js";

export function Card() {
  return RuckyKurung("article", { class: "card" }, [
    RuckyKurung("h2", {}, ["Title"]),
    RuckyKurung("p", {}, ["Single text child is allowed."]),
  ]);
}`),
      RuckyKurung("p", {}, [
        "Props whose names start with ",
        RuckyKurung("code", {}, ["on"]),
        " (e.g. ",
        RuckyKurung("code", {}, ["onClick"]),
        ", ",
        RuckyKurung("code", {}, ["onInput"]),
        ") are registered with ",
        RuckyKurung("code", {}, ["addEventListener"]),
        " using the remainder of the name in lowercase as the event type.",
      ]),
      RuckyKurung("p", {}, [
        RuckyKurung("code", {}, ["style"]),
        " must be a plain object; it is merged onto ",
        RuckyKurung("code", {}, ["element.style"]),
        ". ",
        "Other props are applied via attributes except ",
        RuckyKurung("code", {}, ["value"]),
        " / ",
        RuckyKurung("code", {}, ["checked"]),
        " on form controls, which set element properties.",
      ]),
    ]),

    docBlock("State", "doc-state", [
      note("RuckyInit", [
        RuckyKurung("p", {}, [
          RuckyKurung("code", {}, ["RuckyInit"]),
          " replaces the whole state object. ",
          "It is not a deep merge. Call once at startup unless intentionally resetting.",
        ]),
      ]),
      RuckyKurung("p", {}, [
        RuckyKurung("code", {}, ["RuckyGas"]),
        " performs ",
        RuckyKurung("code", {}, ["{ ...state, ...partial }"]),
        ". ",
        "Nested objects are not deeply merged; update nested data by spreading previous branches explicitly.",
      ]),
      codeBlock(`RuckyInit({ count: 0, user: { name: "Ada" } });
RuckyGas({ count: RuckyCek().count + 1 });
RuckyGas({ user: { ...RuckyCek().user, name: "Bob" } });`),
      note("RuckyNguping", [
        RuckyKurung("p", {}, [
          "Each ",
          RuckyKurung("code", {}, ["RuckyNguping(fn)"]),
          " appends a listener. ",
          "Multiple subscriptions to the same render path will run ",
          RuckyKurung("code", {}, ["RuckyTampil"]),
          " multiple times per update.",
        ]),
      ]),
    ]),

    docBlock("Render", "doc-RuckyTampil", [
      RuckyKurung("p", {}, [
        RuckyKurung("code", {}, ["RuckyTampil"]),
        " keeps a module-level ",
        RuckyKurung("code", {}, ["oldVNode"]),
        ". ",
        "Use a single container (e.g. ",
        RuckyKurung("code", {}, ["#app"]),
        ") for one reconciled tree.",
      ]),
      RuckyKurung("ul", { class: "doc-list" }, [
        RuckyKurung("li", {}, ["Insert / remove / type change: DOM nodes are appended, removed, or replaced."]),
        RuckyKurung("li", {}, ["Same tag: non-event props are synced via ", RuckyKurung("code", {}, ["patchProps"]), "; children are diffed by index (no keys)."]),
        RuckyKurung("li", {}, ["String children become text nodes; string changes replace the text node."]),
      ]),
      note("Event handlers", [
        RuckyKurung("p", {}, [
          RuckyKurung("code", {}, ["patchProps"]),
          " skips ",
          RuckyKurung("code", {}, ["on*"]),
          " keys. ",
          "Listeners are attached only when the element is first created. ",
          "Handlers should keep a stable reference across renders if the element is updated in place.",
        ]),
      ]),
    ]),

    docBlock("Router", "doc-router", [
      RuckyKurung("p", {}, [
        RuckyKurung("code", {}, ["RuckyHalaman()"]),
        " reads ",
        RuckyKurung("code", {}, ["window.location.pathname"]),
        ". ",
        "Resolution order: exact path → ",
        RuckyKurung("code", {}, ["routes[\"/404\"]"]),
        " → built-in fallback component if neither exists.",
      ]),
      note("RuckyCus / popstate", [
        RuckyKurung("p", {}, [
          "Browsers do not fire ",
          RuckyKurung("code", {}, ["popstate"]),
          " for ",
          RuckyKurung("code", {}, ["pushState"]),
          " alone. ",
          RuckyKurung("code", {}, ["RuckyCus"]),
          " dispatches a synthetic ",
          RuckyKurung("code", {}, ["popstate"]),
          " so the same listener handles programmatic navigation and the back/forward buttons.",
        ]),
      ]),
      codeBlock(`import { RuckyPeta, RuckyHalaman, RuckyCus } from "../framework/router.js";

RuckyPeta({
  "/": Home,
  "/docs": Docs,
  "/404": NotFound,
});

RuckyCus("/docs");`),
    ]),

    docBlock("Events", "doc-events", [
      RuckyKurung("p", {}, [
        RuckyKurung("code", {}, ["RuckyEvent(name, fn)"]),
        " assigns ",
        RuckyKurung("code", {}, ["window.__events[name]"]),
        ". ",
        "The stock renderer does not read ",
        RuckyKurung("code", {}, ["data-*"]),
        " attributes; use vnode ",
        RuckyKurung("code", {}, ["onClick"]),
        " (and other ",
        RuckyKurung("code", {}, ["on*"]),
        ") for standard event wiring.",
      ]),
    ]),

    docBlock("Dev server", "doc-server", [
      RuckyKurung("p", {}, [
        RuckyKurung("code", {}, ["GET /"]),
        " serves ",
        RuckyKurung("code", {}, ["public/index.html"]),
        ". ",
        "Other paths map to files under ",
        RuckyKurung("code", {}, ["process.cwd()"]),
        " (e.g. ",
        RuckyKurung("code", {}, ["/app/main.js"]),
        ", ",
        RuckyKurung("code", {}, ["/public/style.css"]),
        ").",
      ]),
      RuckyKurung("p", {}, [
        "If a file is missing and the pathname does not use a known static extension, ",
        RuckyKurung("code", {}, ["index.html"]),
        " is returned so client routes survive a full page reload.",
      ]),
      RuckyKurung("p", {}, [
        RuckyKurung("code", {}, ["GET /__reload"]),
        " returns ",
        RuckyKurung("code", {}, ["{ time: number }"]),
        " reflecting recent file activity; ",
        RuckyKurung("code", {}, ["public/index.html"]),
        " polls it for optional auto-reload during development.",
      ]),
    ]),

    docBlock("create-app", "doc-cli", [
      RuckyKurung("p", {}, [
        RuckyKurung("code", {}, ["create-app.js"]),
        " copies ",
        RuckyKurung("code", {}, ["template/"]),
        " (contains ",
        RuckyKurung("code", {}, ["app/"]),
        ") into the target directory, then copies ",
        RuckyKurung("code", {}, ["framework/"]),
        ", ",
        RuckyKurung("code", {}, ["public/"]),
        ", ",
        RuckyKurung("code", {}, ["server.js"]),
        ", ",
        RuckyKurung("code", {}, ["utils.js"]),
        ", and ",
        RuckyKurung("code", {}, ["package.json"]),
        " from the toolkit root. ",
        RuckyKurung("code", {}, ["utils.copyDir"]),
        " performs recursive directory copies.",
      ]),
    ]),

    docBlock("Limitations", "doc-limitations", [
      RuckyKurung("ul", { class: "doc-list" }, [
        RuckyKurung("li", {}, ["No keyed reconciliation for list children."]),
        RuckyKurung("li", {}, ["No fragments; a single root vnode per component output is typical."]),
        RuckyKurung("li", {}, ["Single ", RuckyKurung("code", {}, ["oldVNode"]), " per ", RuckyKurung("code", {}, ["RuckyTampil"]), " module instance."]),
        RuckyKurung("li", {}, [RuckyKurung("code", {}, ["events.js"]), " registry is not wired into the default renderer."]),
      ]),
    ]),
  ]);

  return RuckyKurung("div", { class: "docs-doc-page" }, [
    RuckyKurung("div", { class: "docs-layout" }, [sidebar, content]),
  ]);
}
