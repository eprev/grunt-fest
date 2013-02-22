# grunt-fest [![Build Status](https://travis-ci.org/eprev/grunt-fest.png)](https://travis-ci.org/eprev/grunt-fest)

> Compile [Fest](https://github.com/fest/fest-tools) templates.

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-fest --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-fest');
```

## The "fest" task

### Overview

In your project's Gruntfile, add a section named `fest` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    fest: {
        options: {
            // Task-specific options go here.
        },
        target: {
            options: {
                // Target-specific options go here.
            }
        }
    }
})
```

### Options

#### options.require

Type: `String`
Default value: `fest`

Path to require fest library.

#### options.compile

Type: `Object`
Default value: `undefined`

Fest’s compile() options.

#### options.ext

Type: `String`
Default value: `.js`

Compiled file’s extension.

#### options.template

Type: `Function`
Default value: `undefined`

This function is called when template will be compiled. It takes an argument as an object with the following properties:

* `src` — path to the template
* `name` — template’s name (relative to the source directory and w/o the extension)
* `contents` — compiled template

### Usage Examples

#### Static mappings

```js
grunt.initConfig({
    fest: {
        options: {
            compile: {
                beautify: true,
                debug: true
            }
        },
        put_in_the_same_derictory: { // Compiles "test/fixtures/qux/**/*.xml" to "test/fixtures/qux/**/*.js"
            src: 'test/fixtures/qux/**/*.xml'
        },
        put_in_the_same_derictory_and_append_ext: { // Compiles "test/fixtures/qux/**/*.xml" to "test/fixtures/qux/**/*.xml.js"
            src: 'test/fixtures/qux/**/*.xml',
            options: {
                ext: '.xml.js'
            }
        },
        'test/tmp': ['test/fixtures/qux/**/*.xml'] // Compiles "test/fixtures/qux/**/*.xml" to "test/tmp/test/fixtures/qux/**/*.js"
    }
})
```

#### Dynamic mappings

In this example Fest compiles "test/fixtures/**/*.xml" to "test/tmp/dynamic-compiled/**/*.js". See [Building the files object dynamically](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) documentation for more information.

```js
grunt.initConfig({
    fest: {
        build: {
            files: [{
                expand: true,                      // Enable dynamic expantion.
                cwd: 'test/fixtures',              // Src matches are relative to this path.
                src: ['**/*.xml'],                 // Actual pattern(s) to match.
                dest: 'test/tmp/dynamic-compiled', // Destination path prefix.
                ext: '.js'                         // Dest filepaths will have this extension.
            }],
            options: {
                compile: {
                    debug: false,
                    beautify: false
                }
            }
        }
    }
})
```

#### Template’s Usage

In this example Grunt builds AMD modules for the compiled templates.

```js
grunt.initConfig({
    fest: {
        build: {
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
                        'define(<%= JSON.stringify(name)  %>, function () { return <%= contents %> ; });',
                        {data: data}
                    );
                },
                compile: {
                    debug: false,
                    beautify: false
                }
            }
        }
    }
});
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2013-02-22  v0.1.0  First official release.
