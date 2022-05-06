const { src, dest, watch, series, parallel } = require("gulp");

// css y sass
const autoprefixer = require("autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");

// /imagenes
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(done) {
  // compilar sass
  src("src/sass/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));

  done();
}

function dev() {
  watch("src/sass/**/*.scss", css);
  watch("src/img/**/*.{jpg,png,gif}", imagenes);
}

function imagenes(done) {
  src("src/img/**/*")
    .pipe(
      imagemin({
        optimizationLevel: 3,
      })
    )
    .pipe(dest("build/img"));

  done();
}

function versionWebp(done) {
  return src("src/img/**/*.{jpg,png}").pipe(webp()).pipe(dest("build/img"));
}

// function versionAvif(done) {
//   const optiones = {
//     quality: 50,
//   };
//   return src("src/img/**/*.{jpg,png}")
//     .pipe(avif(optiones))
//     .pipe(dest("build/img"));
// }

// function tareaDefault() {}

exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
// exports.versionAvif = versionAvif;
exports.css = css;
exports.dev = dev;
exports.default = series(imagenes, versionWebp, css, dev);
