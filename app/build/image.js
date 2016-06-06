var gm = require('gulp-gm');
var debug = require('./gulpplugin/debug');
var rename = require('gulp-rename');

exports.imageToBase64 = function (injectors) {
    var taskname = injectors.taskname;
    var srcpath = injectors.srcpath;
    var destpath = injectors.destpath;
    var tmppath = injectors.tmppath;
    var minwidth = injectors.minwidth;
    var ratio = injectors.ratio;

    injectors.gulp.task(taskname, function () {
        injectors.gulp.src(srcpath)

            .pipe(gm(function (gmfile, done) {
                gmfile.size(function (err, size) {
                    var resizewidth = size.width * ratio;
                    if (resizewidth < minwidth) {
                        resizewidth = minwidth;
                    }

                    done(null, gmfile.resize(
                        resizewidth
                    ));

                });
            }))

            .pipe(injectors.gulp.dest(tmppath))
            .pipe(debug())
            .pipe(rename(function (path) {
                path.extname = ".txt";
            }))
            .pipe(injectors.gulp.dest(destpath))
    });
};

exports.imageToWebp = function (injectors) {
    var webp = require("gulp-webp");

    var taskname = injectors.taskname;
    var srcpath = injectors.srcpath;
    var destpath = injectors.destpath;
    var tmppath = injectors.tmppath;

    injectors.gulp.task(taskname, function () {
        injectors.gulp.src(srcpath)
            .pipe(webp())
            .pipe(injectors.gulp.dest(destpath))
    });
};

exports.imageToIos = function (injectors) {
    var taskname = injectors.taskname;
    var srcpath = injectors.srcpath;
    var destpath = injectors.destpath;
    var plustomediaratio = 375 / 414;
    var plustosmallratio = 320 / 414;

    injectors.gulp.task(taskname, function () {
        
        // plus
        injectors.gulp.src(srcpath)
            .pipe(injectors.gulp.dest(destpath + "/plus"));
        
        // media
        injectors.gulp.src(srcpath)
            .pipe(gm(function (gmfile, done) {
                gmfile.size(function (err, size) {
                    var resizewidth = size.width * plustomediaratio;

                    done(null, gmfile.resize(
                        resizewidth
                    ));

                });
            }))            
            .pipe(injectors.gulp.dest(destpath + "/media"));

        // small
        injectors.gulp.src(srcpath)
            .pipe(gm(function (gmfile, done) {
                gmfile.size(function (err, size) {
                    var resizewidth = size.width * plustosmallratio;

                    done(null, gmfile.resize(
                        resizewidth
                    ));

                });
            }))
            .pipe(injectors.gulp.dest(destpath + "/small"));
    });
};