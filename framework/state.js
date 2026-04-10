/** Objek state tunggal untuk seluruh aplikasi (modul singleton). */
let state = {};

/** Daftar callback yang dijalankan setiap kali `RuckyGas` selesai. */
let listeners = [];

/**
 * Mengganti state awal secara utuh (bukan merge). Panggil sekali saat startup.
 *
 * @param {Record<string, unknown>} initialState - Objek state lengkap.
 */
export function RuckyInit(initialState) {
  state = initialState;
}

/**
 * Membaca snapshot state terkini (referensi objek yang sama; mutasi manual tidak disarankan).
 *
 * @returns {Record<string, unknown>} State saat ini.
 */
export function RuckyCek() {
  return state;
}

/**
 * Menggabungkan properti baru ke state (shallow merge) lalu memanggil semua listener.
 *
 * @param {Record<string, unknown>} newState - Hanya field yang ingin diubah.
 */
export function RuckyGas(newState) {
  state = { ...state, ...newState };

  listeners.forEach(fn => fn());
}

/**
 * Mendaftarkan fungsi yang dipanggil setiap kali state berubah (biasanya memanggil `RuckyTampil`).
 * Tidak ada API `unsubscribe`; hindari mendaftarkan listener berulang tanpa perlu.
 *
 * @param {() => void} fn - Callback tanpa argumen.
 */
export function RuckyNguping(fn) {
  listeners.push(fn);
}
