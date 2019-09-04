const gulp = require("gulp");
const browserSync = require("browser-sync").create();

// Преобразует sass в css
const sass = require("gulp-sass");
// Обработчик ошибок
const plumber = require("gulp-plumber");
// Указывает в инспекторе пути к свойствам
const sourcemaps = require("gulp-sourcemaps");
// Для манипуляций с css файлом
const postcss = require("gulp-postcss");
// Добавляет префиксы к свойствам
const autoprefixer = require("autoprefixer");
// Минификатор css
const minifycss = require("gulp-csso");
// Переименование файла
const rename = require("gulp-rename");
// Удаляем каталог
const del = require("del");
// Для манипуляция с html файлами
const posthtml = require("gulp-posthtml");
// Подключение html файлов
const includehtml = require("posthtml-include");

// html
gulp.task("html", function () {
  return gulp.src("./source/*.html")
    .pipe(posthtml([
      includehtml({
        root: "./source"  // корень откуда копировать
      })
    ]))
    .pipe(gulp.dest("./build"));
});

// Sass в CSS
gulp.task("css", function () {
  return gulp.src("./source/sass/style.scss") // берем scss файл
    .pipe(plumber())  // обрабатывает ошибки в scss файле
    .pipe(sourcemaps.init())  // инициализация map файла
    .pipe(sass()) // компиляция в css
    .pipe(postcss([
      autoprefixer()  // добавляем префиксы
    ]))
    .pipe(sourcemaps.write("."))  // запись map файла в текущий каталог
    .pipe(gulp.dest("./build/css")) // кладем обычный css файл
    .pipe(minifycss()) // минифицируем css файл
    .pipe(rename("style.min.css"))  // переименование файла
    .pipe(sourcemaps.write("."))  // запись map файла в текущий каталог
    .pipe(gulp.dest("./build/css")) // кладем css файл
    .pipe(browserSync.stream());  // перезагружаем сервер
});

// Копируем файлы в build
gulp.task("copy", function () {
  return gulp.src([
    "./source/fonts/**/*.{woff, woff2}",
    "./source/img/**",
    "./source/js/**",
    "./source/*.ico",
    "./source/*.html"
  ], {
      base: "./source"  // корень откуда копировать
    })
    .pipe(gulp.dest("./build"));
});

// Удаляем каталог build
gulp.task("clean", function () {
  return del("./build");
});

// Сборка
gulp.task("build", gulp.series(
  "clean",
  "copy",
  "html",
  "css"
));

// Запускаем локльный сервер
gulp.task("server", function () {
  browserSync.init({
    server: "./build",  // каталог который слушаем
    port: 3000,         // порт
    notify: false,      // уведомление
    open: true,         // url по умолчанию
    cors: true,         //
    ui: false           // доступ к пользовательскому интерфейсу
  });

  gulp.watch("./source/sass/**/*.{sass, scss}", {usePolling: true}, gulp.series("css"));
  gulp.watch("./source/*.html", gulp.series("html")).on("change", browserSync.reload);
});

gulp.task("start", gulp.series("build", "server"));
