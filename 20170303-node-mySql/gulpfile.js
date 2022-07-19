'use strict';
const gulp=require("gulp");//加载gulp模块
const bs=require('browser-sync');//搭建临时服务
const concat=require('gulp-concat');//整合文件
const uglify=require("gulp-uglify");//压缩js
//const rename=require('gulp-rename');//重命名
//const autoprefixer=require('gulp-autoprefixer');//自动添加前缀
const fileinclude  = require('gulp-file-include');//模板的复用
const imagemin=require('gulp-imagemin');//压缩图片
const minify=require('gulp-minify-css');//压缩css
//const cheerio=require('gulp-cheerio');//重命名
const less=require('gulp-less');

gulp.task('browsersync',function(){ //搭建临时服务，并与监听一起使用实现自动刷新
    let files=["./dist/**/*.html",
        "./dist/**/*.css",
        "./dist/**/*.js",
        "./dist/images/**/*",
        "./dist/**/*.mp4"
    ];
    bs.init(files,{server:{baseDir:"./dist/public"}})
});

//gulp.task('cleancss',function(){//压缩css
//    return gulp.src(['./public/css/*.css','./public/css/*.less',"!./public/css/bootstrap.css","!./public/css/bootstrap.min.css"])
//        .pipe(autoprefixer({
//            browsers:['last 2 versions', 'Android >= 4.0','Firefox >= 20','last 3 Safari versions','last 2 Explorer versions','last 1 Chrome versions']//自动添加前缀
//        }))
//        .pipe(less())
//        .pipe(concat('main.css'))//合并css文件为main.css
//        .pipe(minify())
//        .pipe(rename('main.min.css'))//重命名
//        .pipe(gulp.dest('dist/public/css'))
//});
gulp.task('copy-all',function(){//复制全部
    return gulp.src(["./public/**/*","!./public/pages/**/*"])
        .pipe(gulp.dest('dist/public'))
});
gulp.task('copy-index',function(){//复制index
    return gulp.src(["./public/index.html"])
        .pipe(gulp.dest('dist/public'))
});
gulp.task('copy-css',function(){//复制css
    return gulp.src(["./public/css/**/*.css"])
        .pipe(gulp.dest('dist/public/css'))
});
gulp.task("copy-js",function(){ //复制js
    return gulp.src(["./public/js/**/*.js"])
        .pipe(gulp.dest("dist/public/js"))
});
gulp.task('copy-image', function(){//压缩并复制图片
        gulp.src('public/images/**')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/public/images'))
    });
gulp.task('fileinclude', function() {//模板的复用
    gulp.src('./public/pages/**/*.html')
        .pipe(fileinclude({//参数设置
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/public/pages'));//输出路径
});

gulp.task("watch",function(){  //监听任务，当指定文件发生变化时，执行相应的任务
    gulp.watch('public/pages/**/*.html',['fileinclude','copy-image']);
    gulp.watch('./public/index.html',['copy-index']);
    gulp.watch('./public/css/**/*.css',['copy-css']);
    gulp.watch('./public/js/**/*.js',["copy-js"]);
    gulp.watch('./public/images/**/*',["copy-image"]);
});
// 构建
gulp.task('build',['fileinclude','copy-index','watch']);
// gulp.task('build',['fileinclude','copy-index','browsersync','watch']);
// gulp.task('build',['copy-all','fileinclude','copy-index','browsersync']);
