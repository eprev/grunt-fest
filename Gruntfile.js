/*
 * grunt-fest
 * https://github.com/eprev/grunt-fest
 *
 * Copyright (c) 2013 Anton Eprev
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.config.init({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['test/tmp', 'test/fixtures/**/*.js']
        },

        // Configuration to be run (and then tested).
        fest: {
            options: {
                compile: {
                    beautify: true,
                    debug: true
                }
            },
            put_in_the_same_derictory: {
                src: 'test/fixtures/qux/**/*.xml'
            },
            put_in_the_same_derictory_and_append_ext: {
                src: 'test/fixtures/qux/**/*.xml',
                options: {
                    ext: '.xml.js'
                }
            },
            'test/tmp': ['test/fixtures/qux/**/*.xml'],
            dynamic_expansion: {
                files: [{
                    expand: true,                         // Enable dynamic expantion.
                    src: ['test/fixtures/qux/**/*.xml'],
                    dest: 'test/tmp/dynamic',             // Destination path prefix.
                    ext: '.js'                            // Dest filepaths will have this extension.
                }]
            },
            dynamic_expansion_with_cwd_and_template: {
                files: [{
                    expand: true,                      // Enable dynamic expantion.
                    cwd: 'test/fixtures',              // Src matches are relative to this path.
                    src: ['**/*.xml'],                 // Actual pattern(s) to match.
                    dest: 'test/tmp/dynamic-compiled', // Destination path prefix.
                    ext: '.js'                         // Dest filepaths will have this extension.
                }],
                options: {
                    template: function (data) {
                        // Make AMD module
                        return grunt.template.process(
                            'define(<%= JSON.stringify(name + ".js")  %>, function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    },
                    compile: {
                        debug: false,
                        beautify: false
                    }
                }
            },
            named_function: {
                src: 'test/fixtures/qux/foo.xml',
                dest: 'test/tmp/named/foo.js',
                options: {
                    name: 'foo'
                }
            },
            named_function_within_dynamic_expansion: {
                files: [{
                    expand: true,                         // Enable dynamic expantion.
                    src: ['test/fixtures/qux/**/*.xml'],
                    dest: 'test/tmp/dynamic-named'        // Destination path prefix.
                }],
                options: {
                    name: true
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'fest', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
