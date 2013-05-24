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
            relative = path.relative,
            extend = grunt.util._.extend;

        var compile = require(requireResolve(options.require)).compile;

        this.files.forEach(function (f) {
            f.src.forEach(function (src) {
                var dest, relSrc, name, contents;
                if (f.orig.expand) {
                    // dynamic mapping
                    dest = f.dest;
                    relSrc = f.orig.cwd ? relative(f.orig.cwd, src) : src;
                } else if (f.orig.src.length === 1 && grunt.file.isFile(f.orig.src[0])) {
                    // file to file mapping
                    dest = f.dest;
                    relSrc = src;
                } else {
                    // files to directory mapping
                    dest = f.dest ? join(f.dest, src) : src;
                    relSrc = src;
                }
                var se = extname(src),
                    de = extname(dest);
                if (se === de) {
                    dest = dest.slice(0, -de.length) + options.ext;
                }
                grunt.log.write('Compiling "' + src + '" to "' + dest + '"...');
                name = options.name;
                if (name === true) {
                    name = basename(src, se);
                }
                try {
                    contents = compile(src, extend({}, options.compile), name);
                } catch (e) {
                    grunt.log.writeln();
                    grunt.log.error(e.stack);
                }
                if (contents) {
                    if (options.template) {
                        name = se ? relSrc.slice(0, -se.length) : relSrc;
                        contents = options.template({
                            src: src,
                            dest: dest,
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
