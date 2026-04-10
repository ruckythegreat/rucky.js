import { RuckyKurung } from "../framework/h.js";
import { RuckyCus } from "../framework/router.js";

/**
 * Link navigasi SPA: mencegah reload penuh lalu memanggil `RuckyCus`.
 *
 * @param {string} path - Path tujuan (mis. `/docs`).
 * @param {string} label - Teks yang ditampilkan.
 */
function navLink(path, label) {
  const active =
    typeof window !== "undefined" && window.location.pathname === path;
  const props = {
    class: active ? "nav-link nav-link-active" : "nav-link",
    href: path,
    onClick: (e) => {
      e.preventDefault();
      RuckyCus(path);
    },
  };
  if (active) props["aria-current"] = "page";
  return RuckyKurung("a", props, [label]);
}

/**
 * Kerangka halaman: header, navigasi, area konten utama, footer.
 *
 * @param {object|string} pageContent - Vnode hasil pemanggilan komponen halaman.
 */
export function Layout(pageContent) {
  return RuckyKurung("div", { class: "app-shell" }, [
    RuckyKurung("header", { class: "site-header" }, [
      RuckyKurung("div", { class: "header-inner" }, [
        RuckyKurung("div", { class: "brand" }, [
          RuckyKurung(
            "a",
            {
              class: "brand-link",
              href: "/",
              onClick: (e) => {
                e.preventDefault();
                RuckyCus("/");
              },
            },
            ["Rucky.js"]
          ),
          RuckyKurung("span", { class: "brand-tag" }, ["reference docs"]),
        ]),
        RuckyKurung("nav", { class: "site-nav", "aria-label": "Utama" }, [
          navLink("/", "Home"),
          navLink("/docs", "Docs"),
          navLink("/examples", "Examples"),
        ]),
      ]),
    ]),
    RuckyKurung(
      "main",
      {
        class: "site-main",
        id: "main-content",
        "data-route":
          typeof window !== "undefined" ? window.location.pathname : "/",
      },
      [pageContent]
    ),
    RuckyKurung("footer", { class: "site-footer" }, [
      RuckyKurung("p", {}, [
        RuckyKurung("code", {}, ["framework/"]),
        " · ",
        RuckyKurung("code", {}, ["app/"]),
        " · ",
        RuckyKurung("code", {}, ["public/"]),
        " · ",
        RuckyKurung("code", {}, ["server.js"]),
      ]),
    ]),
  ]);
}
