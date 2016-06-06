/**
 * Created by tongguwei on 16/5/29.
 */

var gulp = require('gulp-param')(require('gulp'), process.argv);
var rootpath = process.cwd();

var paths = {
    srcRoot: 'v1/',
    destRoot: 'assets/',
    srctemplateRoot: '.',
    templateRoot: '.',
    srcAssetsRoot: 'v1/',
    destAssetsRoot: 'assets/'
};

// sass
var sassmodule = require("./build/sass");
var localscsscompile = sassmodule.localscsscompile;
var localsasscompile = sassmodule.localsasscompile;

// es6
var es6module = require("./build/es6");

// template
var templateModule = require("./build/template");

// image
var imageModule = require("./build/image");
var imageToBase64 = imageModule.imageToBase64;
var imageToWebp = imageModule.imageToWebp;
var imageToIos = imageModule.imageToIos;

localscsscompile({
    taskname: "watch-src-css",
    gulp: gulp,
    watchpath: "v1/sass/**/*.scss",
    srcfolder: "v1",
    destfolder: "assets",
    rootpath: rootpath
});

localsasscompile({
    taskname: "watch-src-scss",
    gulp: gulp,
    watchpath: "v1/sass/**/*.scss",
    srcpath: "v1/sass/**/*.scss",
    srcfolder: "v1",
    destfolder: "assets/css/",
    rootpath: rootpath
});

es6module({
    gulp: gulp,
    paths: paths
});

templateModule({
    gulp: gulp,
    paths: paths
});

imageToBase64({
    taskname: "build-base64-image",
    gulp: gulp,
    srcpath: "./v1/images/ios/1.jpg",
    destpath: "./tmp/base64",
    tmppath: "./tmp/images",
    ratio: 0.02,
    minwidth: 35
});

imageToIos({
    taskname: "build-ios-image",
    gulp: gulp,
    srcpath: "./v1/images/ios/1.jpg",
    destpath: "./assets/images/ios"
});

imageToWebp({
    taskname: "build-webp-image",
    gulp: gulp,
    srcpath: "./v1/images/wallhaven-189905.jpg",
    destpath: "./tmp/webp",
    tmppath: "./tmp/images",
});

var concat = require("gulp-concat");
var uglify = require('gulp-uglify');

gulp.task("build-lib-js", function (name, src, dest) {
    gulp.src(src.split(","))
        .pipe(concat(name))
        .pipe(uglify())
        .pipe(gulp.dest(dest))
});