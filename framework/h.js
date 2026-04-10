/**
 * Membuat vnode (deskripsi elemen). `children` boleh array, satu string, atau null/undefined.
 *
 * @param {string} tag - Nama tag HTML.
 * @param {Record<string, unknown>} props - Atribut, style, dan handler on* (mis. onClick).
 * @param {unknown} [children] - Anak-anak: array vnode/string, satu string, atau kosong.
 */
export function RuckyKurung(tag, props = {}, children = []) {
  const normalized =
    Array.isArray(children) ? children : children == null ? [] : [children];
  return { tag, props, children: normalized };
}
