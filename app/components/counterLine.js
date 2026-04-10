import { RuckyKurung } from "../../framework/h.js";

/**
 * Contoh komponen UI di file terpisah: hanya mengembalikan vnode (polos).
 * Dipakai dari `home.js` untuk menunjukkan pola impor lintas folder.
 *
 * @param {string} label - Teks label.
 * @param {number|string} value - Nilai yang ditampilkan.
 */
export function counterLine(label, value) {
  return RuckyKurung("p", { class: "demo-count" }, [`${label}: ${value}`]);
}
