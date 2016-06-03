var swigLodash = require('swig-lodash');
var gulpswig = require('gulp-swig');
var debounce = require('debounce');
var exec = require('child_process').exec;
var rename = require('gulp-rename');

var utils = require("zhilizhili-swig/utils");
var layout = require("zhilizhili-swig/tags/layout");

var swigopts = {
    defaults: {
        varControls: ["<<", ">>"]
    },
    setup(swig) {
        swigLodash.useFilter(swig);
        utils.useTag(swig, 'layout', layout);
    }
};

module.exports = function(injectors) {
    injectors.gulp.task("build-swig-template", function(src, dest, name) {
        var destpath = '';
        if (dest != '.' && dest != '') {
            destpath = dest + '/';
        }
        injectors.gulp.src(src)
            .pipe(rename(function (path) {
                path.extname = ".html"
            }))
            .pipe(gulpswig(swigopts))
            .pipe(injectors.gulp.dest(destpath));
    });

    var mtl = function(name, destpath) {
        "use strict";

        return debounce(function(){
            var src = injectors.paths.srctemplateRoot + `${destpath}/${name}.twig`;
            var dest = injectors.paths.templateRoot + `${destpath}`;
            
            exec("gulp build-swig-template -d --src " + src + " --dest " + dest + " --name " + name, function(err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
            });
        }, 0);
    };

    injectors.gulp.task("watch-swig-template", function(name, dest, watch){
        dest = dest || '';
        watch = watch ? watch : injectors.paths.srcRoot + `${watch}.twig`;
        injectors.gulp.watch(watch, mtl(name, dest));
    });
};