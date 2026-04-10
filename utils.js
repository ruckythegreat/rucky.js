import fs from "fs";
import path from "path";

/**
 * Menyalin seluruh isi folder secara rekursif dari sumber ke tujuan.
 * Fungsi ini berguna untuk bootstrap project baru dari template.
 *
 * @param {string} src - Path folder sumber yang akan disalin.
 * @param {string} dest - Path folder tujuan hasil salinan.
 */
export function copyDir(src, dest) {
  // Pastikan folder tujuan tersedia sebelum mulai menyalin file.
  fs.mkdirSync(dest, { recursive: true });

  // Ambil daftar file/folder di dalam sumber.
  const files = fs.readdirSync(src);

  // Proses setiap item: jika folder maka rekursif, jika file maka copy.
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}