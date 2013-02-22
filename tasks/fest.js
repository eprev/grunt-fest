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
            basename = path.basename,
            join = path.join,
            relative = path.relative;

        var compile = require(requireResolve(options.require)).compile;

        this.files.forEach(function (f) {
            f.src.forEach(function (src) {
                var dest, relSrc, name, contents;
                if (f.orig.expand) {
                    dest = f.dest;
                    relSrc = f.orig.cwd ? relative(f.orig.cwd, src) : src;
                } else {
                    dest = f.dest ? join(f.dest, src) : src;
                    relSrc = src;
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
                    if (options.template) {
                        name = se ? relSrc.slice(0, -se.length) : relSrc;
                        contents = options.template({
                            src: src,
                            relSrc: relSrc,
                            name: name,
                            basename: basename(name),
                            contents: contents
                        });
                    }
                    grunt.file.write(dest, contents);
                    grunt.log.ok();
                }
            });
        });

    });

};
