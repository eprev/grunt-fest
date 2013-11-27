'use strict';

var grunt = require('grunt');

/*
    ======== A Handy Little Nodeunit Reference ========
    https://github.com/caolan/nodeunit

    Test methods:
        test.expect(numAssertions)
        test.done()
    Test assertions:
        test.ok(value, [message])
        test.equal(actual, expected, [message])
        test.notEqual(actual, expected, [message])
        test.deepEqual(actual, expected, [message])
        test.notDeepEqual(actual, expected, [message])
        test.strictEqual(actual, expected, [message])
        test.notStrictEqual(actual, expected, [message])
        test.throws(block, [error], [message])
        test.doesNotThrow(block, [error], [message])
        test.ifError(value)
*/

exports.bem = {
    setUp: function (done) {
        this.templates = ['qux/foo', 'qux/bar/baz'];
        done();
    },
    put_in_the_same_derictory: function (test) {
        this.templates.forEach(function (tpl) {
            var actualFn = 'test/expected/fixtures/' + tpl + '.js',
                expectedFn = 'test/fixtures/' + tpl + '.js',
                actual = grunt.file.read(actualFn),
                expected = grunt.file.read(expectedFn);
            test.equal(actual, expected, actualFn + ' != ' + expectedFn);
        });
        test.done();
    },
    put_in_the_same_derictory_and_append_ext: function (test) {
        this.templates.forEach(function (tpl) {
            var actualFn = 'test/expected/fixtures/' + tpl + '.xml.js',
                expectedFn = 'test/fixtures/' + tpl + '.xml.js',
                actual = grunt.file.read(actualFn),
                expected = grunt.file.read(expectedFn);
            test.equal(actual, expected, actualFn + ' != ' + expectedFn);
        });
        test.done();
    },
    'test/tmp': function (test) {
        this.templates.forEach(function (tpl) {
            var actualFn = 'test/tmp/test/fixtures/' + tpl + '.js',
                expectedFn = 'test/expected/tmp/test/fixtures/' + tpl + '.js',
                actual = grunt.file.read(actualFn),
                expected = grunt.file.read(expectedFn);
            test.equal(actual, expected, actualFn + ' != ' + expectedFn);
        });
        test.done();
    },
    dynamic_expansion: function (test) {
        this.templates.forEach(function (tpl) {
            var actualFn = 'test/tmp/dynamic/test/fixtures/' + tpl + '.js',
                expectedFn = 'test/expected/tmp/dynamic/test/fixtures/' + tpl + '.js',
                actual = grunt.file.read(actualFn),
                expected = grunt.file.read(expectedFn);
            test.equal(actual, expected, actualFn + ' != ' + expectedFn);
        });
        test.done();
    },
    dynamic_expansion_with_cwd_and_template: function (test) {
        this.templates.forEach(function (tpl) {
            var actualFn = 'test/tmp/dynamic-compiled/' + tpl + '.js',
                expectedFn = 'test/expected/tmp/dynamic-compiled/' + tpl + '.js',
                actual = grunt.file.read(actualFn),
                expected = grunt.file.read(expectedFn);
            test.equal(actual, expected, actualFn + ' != ' + expectedFn);
        });
        test.done();
    },
    named_function: function (test) {
        ['foo'].forEach(function (tpl) {
            var actualFn = 'test/tmp/named/' + tpl + '.js',
                expectedFn = 'test/expected/tmp/named/' + tpl + '.js',
                actual = grunt.file.read(actualFn),
                expected = grunt.file.read(expectedFn);
            test.equal(actual, expected, actualFn + ' != ' + expectedFn);
        });
        test.done();
    },
    named_function_within_dynamic_expansion: function (test) {
        this.templates.forEach(function (tpl) {
            var actualFn = 'test/tmp/dynamic-named/test/fixtures/' + tpl + '.js',
                expectedFn = 'test/expected/tmp/dynamic-named/test/fixtures/' + tpl + '.js',
                actual = grunt.file.read(actualFn),
                expected = grunt.file.read(expectedFn);
            test.equal(actual, expected, actualFn + ' != ' + expectedFn);
        });
        test.done();
    }
};
