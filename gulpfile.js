const { src, dest } = require("gulp");
const gulp = require("gulp");
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require("gulp-uglify");
// const rigger = require("gulp-rigger");



////////////////////////////////////////////////////////////////////


var path = {
  build: {
      js: "public/javascripts",
      css: "public/styles.css"
  },
  src: {
      js: ["dev/js/*.js","dev/js/comment.js",],
      css: "dev/scss/**/*.scss"
  },
  watch: {
      js: "dev/js/*.js",
      css: "dev/scss/**/*.scss"
  }
};

  //CSS task
  function css() {
    return gulp
      .src("dev/scss/**/*.scss")
      .pipe(plumber())
      .pipe(sass())
      .pipe(
        autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
          cascade: true
        })
      )
      .pipe(cssnano())
      .pipe(gulp.dest("public/stylesheets"))
  }
  // function scripts(){
  //     gulp.src('dev/js/auth.js')
  //     .pipe(concat('scripts.js'))
  //     .pipe(uglify())
  //     .pipe(gulp.dest('public/javascripts'));
  
  // }

  function js() {
    return src(path.src.js, { base: './dev/js/' })
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(path.build.js))
        // .pipe(uglify())
        .pipe(dest(path.build.js))
}

  // // Watch files
  // function watchFiles() {
  //   gulp.watch("./dev/scss/**/*.scss", css);
  //   gulp.watch("./dev/js/**/*.js", scripts);
  // }
  function watchFiles() {

    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);

}

const build = gulp.series(gulp.parallel(css, js));
const watch = gulp.parallel(build, watchFiles);


exports.css = css;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = watch;
  

// gulp.task("css", css);
//   gulp.task("scripts",scripts)
//   gulp.task("watchFiles", watchFiles);
//   gulp.task(
//     "default",
//     gulp.series(gulp.parallel("css"),  "scripts"),
//     gulp.series(gulp.parallel("scripts"),  "watchFiles")
//   );

 
