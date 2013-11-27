# grunt-fest [![Build Status](https://travis-ci.org/eprev/grunt-fest.png)](https://travis-ci.org/eprev/grunt-fest)

> Compile [Fest](https://github.com/mailru/fest) templates.

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

Path to require Fest library.

#### options.compile

Type: `Object`
Default value: `undefined`

Fest’s compile() options.

#### options.ext

Type: `String`
Default value: `.js`

Compiled file’s extension.

#### options.name

Type: `String`
Default value: `undefined`

Compiled function’s name. The basename of the source file will be used if is set to True.

#### options.template

Type: `Function`
Default value: `undefined`

This function is called when template will be compiled. It takes an argument as an object with the following properties:

* `src` — path to the template
* `relSrc` — relative path to the template
* `dest` — path to the compiled file
* `name` — template’s name (relative to the source directory and w/o the extension)
* `basename` — template’s basename
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

        // Compiles "fest/**/*.xml" to "fest/**/*.js"
        put_in_the_same_derictory: {
            src: 'fest/**/*.xml'
        },

        // Compiles "fest/**/*.xml" to "fest/**/*.xml.js"
        put_in_the_same_derictory_and_append_ext: {
            src: 'fest/**/*.xml',
            options: {
                ext: '.xml.js'
            }
        },

        // Compiles "test/**/*.xml" to "build/fest/**/*.js",
        'build': ['fest/**/*.xml'],

        // Compiles "test/qux.xml" to named function and writes it to "build/qux.js"
        v8: {
            src: 'fest/qux.xml',
            dest 'build/qux.js',
            options: {
                name: 'qux'
            }
        }
    }
})
```

#### Dynamic mappings

In this example Fest compiles "fest/**/*.xml" to "fest-build/**/*.js". See [Building the files object dynamically](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) documentation for more information.

```js
grunt.initConfig({
    fest: {
        build: {
            files: [{
                expand: true,       // Enable dynamic expantion.
                cwd: 'fest',        // Src matches are relative to this path.
                src: ['**/*.xml'],  // Actual pattern(s) to match.
                dest: 'fest-build', // Destination path prefix.
                ext: '.js'          // Dest filepaths will have this extension.
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
                expand: true,       // Enable dynamic expantion.
                cwd: 'fest',        // Src matches are relative to this path.
                src: ['**/*.xml'],  // Actual pattern(s) to match.
                dest: 'fest-build', // Destination path prefix.
                ext: '.js'          // Dest filepaths will have this extension.
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

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/). Before pull-request to dev branch do rebase.

## Release History

* 2013-11-27  v0.1.4  Upgraded dependencies
* 2013-05-24  v0.1.3  Support for function name within dynamic mappings
* 2013-03-13  v0.1.2  Added option to name compiled function
* 2013-03-04  v0.1.1  Use of initial compile options
* 2013-02-22  v0.1.0  First official release
