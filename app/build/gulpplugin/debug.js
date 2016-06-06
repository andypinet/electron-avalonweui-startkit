var through = require('through2');

var PluginError = require('gulp-util').PluginError;

// consts
var PLUGIN_NAME = 'gulp-debug';

module.exports = function() {
    return through.obj(function(file, encoding, callback) {
        if (file.isNull()) {
            // nothing to do
            return callback(null, file);
        }

        if (file.isStream()) {
            // file.contents is a Stream - https://nodejs.org/api/stream.html
            // this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));

            // or, if you can handle Streams:
            //file.contents = file.contents.pipe(...
            return callback(null, file);
        } else if (file.isBuffer()) {
            // file.contents is a Buffer - https://nodejs.org/api/buffer.html
            // this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));

            // console.log("debug");
            // console.log("file type is buffer");
            // console.dir(file.contents.toString('base64'));

            var str = "data:image/jpg;base64, " + file.contents.toString('base64');

            file.contents =  Buffer.from(str);
            
            // or, if you can handle Buffers:
            //file.contents = ...
            return callback(null, file);
        }
    });
};