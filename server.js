import http from "http";
import fs from "fs";
import path from "path";

let lastUpdate = Date.now();
const port = 3000;

/** Folder statis utama (berisi index.html, CSS, dll.). */
const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * Ekstensi file yang dianggap aset statis. Jika tidak cocok dan file tidak ada,
 * server mengembalikan index.html agar routing client-side (SPA) tetap jalan.
 */
const STATIC_EXTENSIONS = new Set([
  ".js",
  ".css",
  ".json",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".ico",
  ".woff",
  ".woff2",
  ".map",
  ".html",
]);

/**
 * Mengambil pathname murni dari URL request (tanpa query string).
 *
 * @param {string | undefined} reqUrl - Nilai req.url dari Node HTTP.
 * @returns {string} Pathname, default "/".
 */
function getPathname(reqUrl) {
  if (!reqUrl) return "/";
  try {
    return new URL(reqUrl, "http://localhost").pathname;
  } catch {
    return "/";
  }
}

/**
 * Memutuskan apakah 404 sebaiknya diganti dengan index.html (fallback SPA).
 *
 * @param {string} pathname - Pathname permintaan.
 * @returns {boolean} True jika boleh fallback ke index.html.
 */
function shouldSpaFallback(pathname) {
  const ext = path.extname(pathname);
  if (ext === "") return true;
  return !STATIC_EXTENSIONS.has(ext);
}

/**
 * Memperbarui penanda waktu terakhir perubahan file.
 * Digunakan sebagai acuan endpoint reload sederhana.
 */
function updateLastChangeTime() {
  lastUpdate = Date.now();
}

/**
 * Menyalakan watcher agar perubahan file bisa terdeteksi otomatis.
 */
function startFileWatcher() {
  fs.watch("./", { recursive: true }, (_eventType, filename) => {
    console.log("File berubah:", filename);
    updateLastChangeTime();
  });
}

/**
 * Mengirim informasi waktu update terakhir untuk kebutuhan auto-reload client.
 *
 * @param {http.ServerResponse} res - Objek response dari HTTP server.
 */
function handleReloadEndpoint(res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ time: lastUpdate }));
}

/**
 * Mengubah pathname menjadi path file absolut di disk.
 * Root `/` selalu mengarah ke `public/index.html`.
 *
 * @param {string} pathname - Pathname dari URL.
 * @returns {string} Path file lokal absolut.
 */
function resolveFilePath(pathname) {
  if (!pathname || pathname === "/") {
    return path.join(PUBLIC_DIR, "index.html");
  }
  const relative = pathname.replace(/^\//, "");
  return path.join(process.cwd(), relative);
}

/**
 * Menentukan content-type berdasarkan ekstensi file.
 * Default diarahkan ke HTML agar aman untuk halaman utama.
 *
 * @param {string} filePath - Path file yang akan dikirim.
 * @returns {string} Nilai header Content-Type.
 */
function getContentType(filePath) {
  const ext = path.extname(filePath);
  if (ext === ".js") return "text/javascript";
  if (ext === ".css") return "text/css";
  if (ext === ".json") return "application/json";
  return "text/html";
}

/**
 * Mengirim isi `public/index.html` (untuk fallback SPA).
 *
 * @param {http.ServerResponse} res - Objek response dari HTTP server.
 */
function serveIndexHtml(res) {
  const indexPath = path.join(PUBLIC_DIR, "index.html");
  fs.readFile(indexPath, (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Index tidak ditemukan");
      return;
    }
    updateLastChangeTime();
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
}

/**
 * Membaca file dari disk lalu mengirimkan hasilnya ke browser.
 * Jika file tidak ada dan pathname cocok pola SPA, kirim index.html.
 *
 * @param {string} filePath - Path file yang diminta.
 * @param {string} pathname - Pathname asli (untuk keputusan fallback).
 * @param {http.ServerResponse} res - Objek response dari HTTP server.
 */
function serveStaticFile(filePath, pathname, res) {
  const contentType = getContentType(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT" && shouldSpaFallback(pathname)) {
        serveIndexHtml(res);
        return;
      }
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      return;
    }

    updateLastChangeTime();
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
}

/**
 * Menangani seluruh request masuk ke server.
 *
 * @param {http.IncomingMessage} req - Objek request dari client.
 * @param {http.ServerResponse} res - Objek response yang dikirim ke client.
 */
function handleRequest(req, res) {
  if (req.url === "/__reload") {
    handleReloadEndpoint(res);
    return;
  }

  const pathname = getPathname(req.url);
  const filePath = resolveFilePath(pathname);
  serveStaticFile(filePath, pathname, res);
}

const server = http.createServer(handleRequest);

server.listen(port, () => {
  startFileWatcher();
  console.log(`Server jalan di http://localhost:${port}`);
});