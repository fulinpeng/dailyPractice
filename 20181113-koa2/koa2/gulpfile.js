const gulp = require("gulp");
const babel = require("gulp-babel");
const del = require("del");

const paths = {
  babel: [
    "src/**/*",
  ],
  public: "src/public/**/*"
};

gulp.task("clean", function() {
  return del(["build"]).then(path => {
    console.log("Deleted files and folders:", path.join("\n"));
  });
});

// gulp.task("public", () => {
//   return gulp.src(paths.public).pipe(gulp.dest("./build/src/public"));
// });

gulp.task("babel", () =>
  gulp
    .src(paths.babel)
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(gulp.dest("./build"))
);

gulp.task("watch", () => {
  return gulp.watch(paths.babel, ["babel"]);
});

// gulp.task("default", ["watch", "babel"]);
gulp.task("default", ["babel"]);