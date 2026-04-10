let oldVNode = null;

/**
 * Menyelaraskan properti DOM dengan vnode baru saat tag sama (update in-place).
 * Event handler (on*) tidak di-patch di sini agar tidak menumpuk listener.
 *
 * @param {Element} el - Elemen DOM yang sudah ada.
 * @param {Record<string, unknown>} newProps - Props dari vnode baru.
 * @param {Record<string, unknown>} oldProps - Props dari vnode lama.
 */
function patchProps(el, newProps, oldProps) {
  const next = newProps || {};
  const prev = oldProps || {};
  const keys = new Set([...Object.keys(prev), ...Object.keys(next)]);

  for (const key of keys) {
    if (key.startsWith("on")) continue;
    if (key === "style") {
      Object.assign(el.style, next.style || {});
      continue;
    }

    const nv = next[key];
    const ov = prev[key];
    if (nv === ov) continue;

    if (nv === undefined) {
      el.removeAttribute(key);
      if (key === "value" && "value" in el) el.value = "";
      continue;
    }

    const tag = el.tagName;
    if (key === "value" && (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT")) {
      el.value = nv;
      continue;
    }
    if (key === "checked" && tag === "INPUT") {
      el.checked = !!nv;
      continue;
    }

    el.setAttribute(key, nv);
  }
}

function changed(a, b) {
  return (
    typeof a !== typeof b ||
    (typeof a === "string" && a !== b) ||
    a.tag !== b.tag
  );
}

function updateElement(parent, newVNode, oldVNode, index = 0) {
  const existing = parent.childNodes[index];

  // 1. kalau belum ada → tambah
  if (!oldVNode) {
    parent.appendChild(createElement(newVNode));
  }

  // 2. kalau dihapus
  else if (!newVNode) {
    if (existing) parent.removeChild(existing);
  }

  // 3. kalau beda tipe → replace
  else if (changed(newVNode, oldVNode)) {
    parent.replaceChild(createElement(newVNode), existing);
  }

  // 4. kalau sama → patch props lalu diff children
  else if (newVNode.tag) {
    patchProps(existing, newVNode.props, oldVNode.props);
    const newCh = newVNode.children || [];
    const oldCh = oldVNode.children || [];
    const newLength = newCh.length;
    const oldLength = oldCh.length;
    const minLen = Math.min(newLength, oldLength);

    for (let i = 0; i < minLen; i++) {
      updateElement(existing, newCh[i], oldCh[i], i);
    }

    if (newLength > oldLength) {
      for (let i = oldLength; i < newLength; i++) {
        existing.appendChild(createElement(newCh[i]));
      }
    } else if (oldLength > newLength) {
      while (existing.childNodes.length > newLength) {
        existing.removeChild(existing.childNodes[newLength]);
      }
    }
  }
}

export function RuckyTampil(component, container) {
  const newVNode = component();

  if (!oldVNode) {
    // first render
    const el = createElement(newVNode);
    container.appendChild(el);
  } else {
    // update
    updateElement(container, newVNode, oldVNode);
  }

  oldVNode = newVNode;
}

function createElement(vnode) {
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }

  const el = document.createElement(vnode.tag);

  const props = vnode.props || {};

  for (let key in props) {
    const value = props[key];
    if (value === undefined) continue;

    // 🎯 HANDLE EVENT
    if (key.startsWith("on")) {
      const eventType = key.slice(2).toLowerCase();
      el.addEventListener(eventType, value);
    }

    // 🎨 HANDLE STYLE
    else if (key === "style") {
      Object.assign(el.style, value);
    }

    // nilai form: set properti agar konsisten dengan patchProps
    else if (
      key === "value" &&
      (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT")
    ) {
      el.value = value;
    } else if (key === "checked" && el.tagName === "INPUT") {
      el.checked = !!value;
    }

    // attribute biasa
    else {
      el.setAttribute(key, value);
    }
  }

  // children
  vnode.children?.forEach(child => {
    el.appendChild(createElement(child));
  });

  return el;
}
