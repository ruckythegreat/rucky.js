import { RuckyKurung } from "../../framework/h.js";
import { RuckyCus } from "../../framework/router.js";

function ctaButton(path, label, primary) {
  const className = primary ? "btn btn-primary home-cta-primary" : "btn btn-secondary";
  if (/^https?:\/\//.test(path)) {
    return RuckyKurung(
      "a",
      {
        class: className,
        href: path,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      [label]
    );
  }

  return RuckyKurung(
    "button",
    {
      type: "button",
      class: className,
      onClick: () => RuckyCus(path),
    },
    [label]
  );
}

function extLink(href, label) {
  return RuckyKurung(
    "a",
    {
      class: "home-ext-link",
      href,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    [label]
  );
}

/**
 * Landing: framework introduction, primary navigation, maintainer / dev context.
 */
export function Home() {
  return RuckyKurung("div", { class: "page home-page" }, [
    RuckyKurung("header", { class: "home-hero" }, [
      RuckyKurung("div", { class: "home-hero-wave", "aria-hidden": "true" }),
      RuckyKurung("div", { class: "home-hero-inner" }, [
        RuckyKurung("p", { class: "home-hero-eyebrow" }, ["RuckyTheGreat · Rucky.js"]),
        RuckyKurung("h1", { class: "home-hero-title" }, ["Rucky.js"]),
        RuckyKurung("p", { class: "home-hero-tagline" }, [
          "A small ES-module runtime: vnode trees, a global store with subscribers, a minimal DOM reconciler, and a ",
          RuckyKurung("code", {}, ["history"]),
          "-based router — no bundler, just ",
          RuckyKurung("code", {}, ["node server.js"]),
          " and the browser.",
        ]),
        RuckyKurung("div", { class: "home-hero-actions" }, [
          ctaButton("/docs", "Documentation", true),
          ctaButton("/examples", "Examples", false),
        ]),
      ]),
    ]),

    RuckyKurung("section", { class: "card home-intro-card" }, [
      RuckyKurung("h2", {}, ["What you get"]),
      RuckyKurung("ul", { class: "home-feature-list" }, [
        RuckyKurung("li", {}, [RuckyKurung("strong", {}, ["framework/"]), " — ", RuckyKurung("code", {}, ["RuckyKurung"]), ", ", RuckyKurung("code", {}, ["state"]), ", ", RuckyKurung("code", {}, ["RuckyTampil"]), ", ", RuckyKurung("code", {}, ["router"]), ", ", RuckyKurung("code", {}, ["events"]), "."]),
        RuckyKurung("li", {}, [RuckyKurung("strong", {}, ["app/"]), " — your routes, layout, and shared UI helpers."]),
        RuckyKurung("li", {}, [RuckyKurung("strong", {}, ["public/"]), " — static entry (", RuckyKurung("code", {}, ["index.html"]), ", styles, assets)."]),
        RuckyKurung("li", {}, [RuckyKurung("strong", {}, ["server.js"]), " — static file server, SPA fallback, ", RuckyKurung("code", {}, ["/__reload"]), " for dev refresh."]),
      ]),
    ]),

    RuckyKurung("section", { class: "card home-dev-card" }, [
      RuckyKurung("h2", {}, ["About the maintainer"]),
      RuckyKurung("p", { class: "home-dev-lead" }, [
        "Maintained by ",
        RuckyKurung("strong", {}, ["RuckyTheGreat"]),
        " — building web apps and Unity projects, with a focus on polished, interactive experiences.",
      ]),
      RuckyKurung("ul", { class: "home-dev-list" }, [
        RuckyKurung("li", {}, ["Exploring ", RuckyKurung("strong", {}, ["FastAPI"]), ", ", RuckyKurung("strong", {}, ["React"]), ", and full-stack deployment pipelines."]),
        RuckyKurung("li", {}, ["Background in ", RuckyKurung("strong", {}, ["game dev"]), " and ", RuckyKurung("strong", {}, ["web"]), " tooling."]),
      ]),
      RuckyKurung("h3", { class: "home-subheading" }, ["Tech focus"]),
      RuckyKurung("div", { class: "home-pills" }, [
        "Python",
        "JavaScript",
        "HTML",
        "CSS",
        "React",
        "FastAPI",
        "Git",
        "Blender",
      ].map((t) => RuckyKurung("span", { class: "home-pill" }, [t]))),
      RuckyKurung("h3", { class: "home-subheading" }, ["Featured projects"]),
      RuckyKurung("ul", { class: "home-project-list" }, [
        RuckyKurung("li", {}, [extLink("https://github.com/ruckythegreat/MimiVisualNovel", "Mimi Visual — visual novel")]),
        RuckyKurung("li", {}, [extLink("https://github.com/ruckythegreat/My-waifu-simulator", "My Waifu — simulator")]),
        RuckyKurung("li", {}, [extLink("https://github.com/ruckythegreat/jawaskripsikalku", "Jawa Kalku")]),
      ]),
      RuckyKurung("h3", { class: "home-subheading" }, ["Connect"]),
      RuckyKurung("div", { class: "home-social" }, [
        extLink("https://www.tiktok.com/@naptuneeel", "TikTok"),
        extLink("https://www.instagram.com/vyu_tune", "Instagram"),
        extLink("https://twitter.com/ruckishuman", "Twitter"),
        extLink("https://discord.gg/2zwUr3jaHx", "Discord"),
        extLink("https://github.com/ruckythegreat", "GitHub"),
      ]),
    ]),
  ]);
}
