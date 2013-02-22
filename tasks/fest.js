/*
 * grunt-fest
 * https://github.com/eprev/grunt-fest
 *
 * Copyright (c) 2013 Anton Eprev
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var path = require('path'),
        resolve = path.resolve.bind(process.cwd()),
        requireResolve = function (module) {
            var start = module.substr(0, 2);
            return (start !== './' && start !== '..') ? module : resolve(module);
        };

    grunt.registerMultiTask('fest', 'Compile Fest templates', function () {

        var options = this.options({
                require: 'fest',
                ext: '.js'
            }),
            extname = path.extname,
            join = path.join,
            relative = path.relative;

        var compile = require(requireResolve(options.require)).compile;

        this.files.forEach(function (f) {
            f.src.forEach(function (src) {
                var dest, relFn, contents;
                if (f.orig.expand) {
                    dest = f.dest;
                    relFn = f.orig.cwd ? relative(f.orig.cwd, src) : src;
                } else {
                    dest = f.dest ? join(f.dest, src) : src;
                    relFn = src;
                }
                var se = extname(src),
                    de = extname(dest);
                if (se === de) {
                    dest = dest.slice(0, -de.length) + options.ext;
                }
                grunt.log.write('Compiling "' + src + '" to "' + dest + '"...');
                try {
                    contents = compile(src, options.compile);
                } catch (e) {
                    grunt.log.writeln();
                    grunt.log.error(e.stack);
                }
                if (contents) {
                    grunt.file.write(dest, contents);
                    grunt.log.ok();
                }
            });
        });

    });

};
