
exports.localscsscompile = function(injectors) {
    var watchpath = injectors.watchpath;
    var rootpath = injectors.rootpath;
    var srcfolder = injectors.srcfolder;
    var destfolder = injectors.destfolder;
    var taskname = injectors.taskname;
    var cleanCSS = require('gulp-clean-css');
    var rename = require('gulp-rename');

    function resloveCssPath(rootpath, scsspath) {
        var arr = scsspath.split("/");
        return {
            folder: arr.slice(0, arr.length - 1).join("/").replace(rootpath, "").slice(1),
            csspath: arr.slice(0, arr.length - 1).join("/") + "/" +  arr[arr.length - 1].replace("scss", "css")
        }
    }

    var postcss = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');

    injectors.gulp.task(taskname, function () {
        injectors.gulp.watch(watchpath, function (change) {
            var result = resloveCssPath(rootpath, change.path);
            var csspath = result.csspath;
            var dest = result.folder;
            var destpath = dest.replace(srcfolder, destfolder).replace("sass", "css");
            injectors.gulp.src(csspath)
                .pipe(postcss([ autoprefixer({ browsers: ['> 1%',  'ios >= 7'] }) ]))
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(rename(function (path) {
                    path.basename = path.basename + "";
                }))
                .pipe(injectors.gulp.dest(destpath))
        });
    });
};

exports.localsasscompile = function(injectors) {
    var watchpath = injectors.watchpath;
    var rootpath = injectors.rootpath;
    var srcfolder = injectors.srcfolder;
    var destfolder = injectors.destfolder;
    var srcpath = injectors.srcpath;
    var taskname = injectors.taskname;
    var sass = require('gulp-ruby-sass');
    var cleanCSS = require('gulp-clean-css');
    var rename = require('gulp-rename');

    function resloveCssPath(rootpath, scsspath) {
        var arr = scsspath.split("/");
        return {
            folder: arr.slice(0, arr.length - 1).join("/").replace(rootpath, "").slice(1),
            csspath: arr.slice(0, arr.length - 1).join("/") + "/" +  arr[arr.length - 1].replace("scss", "css")
        }
    }

    var postcss = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');

    injectors.gulp.task(taskname, function () {
        injectors.gulp.watch(watchpath, function (change) {
            var result = resloveCssPath(rootpath, change.path);
            var csspath = result.csspath;
            console.log(csspath);
            
            return sass(srcpath, {
                require: ["sass-json-vars", "sass-globbing", "sass/zhilizhili"],
                verbose: true
            })
                .on('error', sass.logError)
                .pipe(postcss([ autoprefixer({ browsers: ['> 1%',  'ios >= 7'] }) ]))
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(rename(function (path) {
                    path.basename = path.basename + "";
                }))
                .pipe(injectors.gulp.dest(destfolder));
        });
    });
};