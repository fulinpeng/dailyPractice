var gulp = require('gulp');
// var rename= require('gulp-rename');
var uglify= require("gulp-uglify");
var minifyHtml= require("gulp-minify-html");
var rev = require('gulp-rev');
var revCollector = require("gulp-rev-collector");

gulp.task('minify_js', function(){
    gulp.src('src/**/*.js')
        .pipe(uglify())//压缩
    //         // .pipe(rename('index.min.js'))
        .pipe(rev())  //set hash key
        .pipe(gulp.dest('build/'))
        .pipe(rev.manifest()) //set hash key json
        .pipe(gulp.dest('build/rev/')); //dest hash key json
});

gulp.task('rev', function () {
    gulp.src(['build/rev/**/*.json', 'src/**/*.html'])
        .pipe( revCollector({
            replaceReved: true
        }))
        .pipe(minifyHtml()) //压缩
        .pipe( gulp.dest('build/'));
});


gulp.task('default',['minify_js','rev']);

