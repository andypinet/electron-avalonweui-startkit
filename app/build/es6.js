/**
 * Created by tongguwei on 16/4/4.
 */

var rename = require("gulp-rename");

module.exports = function(injectors) {
    'use strict';

    var debounce = require('debounce');
    var exec = require('child_process').exec;

    const babel = require('gulp-babel');
    const browserify = require("gulp-browserify");
    const babelify = require("babelify");

    var es5 = browserify({
        transform: function(filename, opts){
            return babelify(filename, {
                presets: ['es2015'],
                plugins: ['transform-regenerator']
            });
        }
    });

    var mtl = function(name, dest) {
        "use strict";

        let src = injectors.paths.srcRoot + `${dest}/${name}.js`;
        let destpath = injectors.paths.destRoot + `${dest}`;

        return debounce(function(){
            exec(`gulp build-cmd-js --src ${src} --dest ${destpath} `, function(err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
            });
        }, 0);
    };

    injectors.gulp.task("build-cmd-js", function(src, dest) {
        return injectors.gulp.src(src)
            .pipe(es5)
            .pipe(injectors.gulp.dest(dest));
    });

    injectors.gulp.task("watch-cmd-js", function(name, dest, watch) {
        var watchpath = watch || "";
        injectors.gulp.watch(watchpath, mtl(name, dest));
    });

    var btl = function(name, dest) {
        "use strict";

        let src = injectors.paths.srcRoot + `${dest}/${name}.js`;
        let destpath = injectors.paths.destRoot + `${dest}`;

        return debounce(function(){
            exec(`gulp build-browserify-js --src ${src} --dest ${destpath} `, function(err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
            });
        }, 0);
    };

    injectors.gulp.task("build-browserify-js", function(src, dest) {
        return injectors.gulp.src(src)
            .pipe(browserify())
            .pipe(injectors.gulp.dest(dest));
    });

    injectors.gulp.task("watch-browserify-js", function(name, dest, watch) {
        var watchpath = watch || "";
        injectors.gulp.watch(watchpath, btl(name, dest));
    });

    var stl = function(name, dest) {
        "use strict";

        let src = injectors.paths.srcRoot + `${dest}/${name}.js`;
        let destpath = injectors.paths.srcRoot + `${dest}`;

        return debounce(function(){
            exec(`gulp build-local-js --name ${name} --src ${src} --dest ${destpath} `, function(err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
            });
        }, 0);
    };

    injectors.gulp.task("build-local-js", function(name, src, dest) {
        return injectors.gulp.src(src)
            .pipe(es5)
            .pipe(rename(function (path) {
                path.basename = "index";
            }))
            .pipe(injectors.gulp.dest(dest));
    });

    injectors.gulp.task("watch-local-js", function(name, dest, watch) {
        var watchpath = watch || "";
        injectors.gulp.watch(watchpath, stl(name, dest));
    });
    
};