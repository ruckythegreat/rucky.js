import fs from "fs";
import path from "path";
import { copyDir } from "./utils.js";

/**
 * Mengambil nama project dari argumen CLI.
 * Contoh pemakaian: node create-app.js my-app
 *
 * @returns {string | undefined} Nama project yang diminta user.
 */
function getProjectNameFromArgs() {
  return process.argv[2];
}

/**
 * Memastikan nama project valid sebelum proses copy dijalankan.
 *
 * @param {string | undefined} projectName - Nama project dari CLI.
 */
function validateProjectName(projectName) {
  if (!projectName) {
    throw new Error("Nama project wajib diisi. Contoh: node create-app.js my-app");
  }
}

/**
 * Menentukan path absolut untuk folder template dan folder tujuan.
 *
 * @param {string} projectName - Nama project tujuan.
 * @returns {{ templatePath: string, targetPath: string, rootDir: string }}
 */
function resolvePaths(projectName) {
  const rootDir = process.cwd();
  const templatePath = path.resolve(rootDir, "template");
  const targetPath = path.resolve(rootDir, projectName);
  return { templatePath, targetPath, rootDir };
}

/**
 * Menyalin file atau folder dari root toolkit ke project baru.
 * Template hanya berisi `app/`; sisanya disalin dari repo induk agar project bisa dijalankan.
 *
 * @param {string} rootDir - Root repo rucky.js (cwd saat menjalankan script).
 * @param {string} targetPath - Folder project baru.
 */
function copyToolkitIntoProject(rootDir, targetPath) {
  const items = [
    { name: "framework", isDir: true },
    { name: "public", isDir: true },
    { name: "server.js", isDir: false },
    { name: "utils.js", isDir: false },
    { name: "package.json", isDir: false },
  ];

  for (const item of items) {
    const src = path.join(rootDir, item.name);
    if (!fs.existsSync(src)) continue;

    const dest = path.join(targetPath, item.name);
    if (item.isDir) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

/**
 * Menjalankan proses pembuatan project baru dari template + modul toolkit.
 */
function main() {
  const projectName = getProjectNameFromArgs();
  validateProjectName(projectName);

  const { templatePath, targetPath, rootDir } = resolvePaths(projectName);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Folder template tidak ditemukan: ${templatePath}`);
  }

  if (fs.existsSync(targetPath)) {
    throw new Error(`Folder tujuan sudah ada: ${targetPath}`);
  }

  console.log(`Membuat project "${projectName}"...`);
  copyDir(templatePath, targetPath);
  copyToolkitIntoProject(rootDir, targetPath);
  console.log(`Selesai. Project tersedia di: ${targetPath}`);
  console.log("Jalankan: cd " + projectName + " && node server.js");
}

main();
