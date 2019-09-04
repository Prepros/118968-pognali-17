// gulp.task - 1 последовательная вещь
// gulp.series - последовательное выполнение сценариев
// gulp.parallel - параллельное выполнение сценариев

const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemap = require("gulp-sourcemaps");
const server = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");


gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("image", function () {
  return gulp.src("source/img/**/*.{png, jpg, svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo() // комментарии, пробелы и ентеры
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png, jpg}")
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include() // <include src="build/img/sprite.svg"></include>
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff, woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source" // корень от куда копировать
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("refresh", function () {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", {usePolling: true}, gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html"));
  gulp.watch("source/*.html", gulp.series("html")).on("change", server.reload);

  // gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  // gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "html"
));
gulp.task("start", gulp.series("build", "server"));
