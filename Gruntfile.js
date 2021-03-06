const fs = require('fs');

module.exports = function(grunt) {

    const PACKAGE = require("./package.json");

    const TITLE = "it's all REAL";

    // All paths should end in "/". I'm lazy.

    const SRC_DIR = "./src/";
    const BUILD_DIR = "./build/";
    const TMP_DIR = "./tmp/";

    // Also, I'm adding an extra layer onto the build/src directories in case we
    // ever want to build for a different platform.

    const WWW_SRC = SRC_DIR + "www/";
    const WWW_BUILD = BUILD_DIR + "www/";
    const WWW_TMP = TMP_DIR + "www/";

    var config = {};

    config.clean = {};
    config.clean.www = ["./build/www/**/*.*", "./tmp/www/**/*.*"];

    config.sass = {};
    config.sass.www = {
        files: [{
            options: {
                style: "compressed",
            },
            src: WWW_SRC + "css/style.scss",
            dest: WWW_BUILD + "css/style.min.css"
        }]
    };

    config.replace = {};
    config.replace.www = {
        expand: true,
        src: [WWW_SRC + "pages/*.html"],
        dest: WWW_TMP,
        replacements: [{
            from: "<!--include head-->",
            to: fs.readFileSync(WWW_SRC + "templates/head.html", "utf8")
        }, {
            from: "<!--include nav-->",
            to: fs.readFileSync(WWW_SRC + "templates/nav.html", "utf8")
        }, {
            from: "<!--include footer-->",
            to: fs.readFileSync(WWW_SRC + "templates/footer.html", "utf8")
        }, {
            from: "<!--include scripts-->",
            to: fs.readFileSync(WWW_SRC + "templates/scripts.html", "utf8")
        }, {
            from: "<!--include sidebar_normal-->",
            to: fs.readFileSync(WWW_SRC + "templates/sidebar_normal.html", "utf8")
        }, {
            from: "{{TITLE}}",
            to: TITLE
        }, {
            from: "{{VERSION}}",
            to: PACKAGE.version
        }]
    };

    config.htmlmin = {};
    config.htmlmin.www = {
        options: {
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeEmptyAttributes: true
        },
        files: [{
            "expand": true,
            "cwd": WWW_TMP,
            "src": ["**/*.html"],
            "dest": WWW_BUILD,
            "ext": ".html"
        }]
    };

    config.babel = {
        options: {
            sourceMap: true,
            presets: ['babel-preset-es2015']
        }
    };
    config.babel.www = {
        files: [{
            "expand": true,
            "cwd": WWW_SRC + "js/",
            "src": ["**/*.es2015"],
            "dest": WWW_BUILD + "js/",
            "ext": ".js"
        }]
    };

    config.uglify = {
        options: {
            mangle: false,
            beautify: true
        }
    };
    config.uglify.www = {
        // src: [WWW_SRC + 'js/**/*.js', WWW_TMP + 'js/**/*.js'],
        // dest: WWW_BUILD + "js/script.min.js"
        files: [{
            expand: true,
            cwd: WWW_SRC + 'js/',
            src: '**/*.js',
            dest: WWW_BUILD + "js/"
        }]
    };

    config.copy = {};
    config.copy.www = {
        files: [{
            expand: true,
            cwd: WWW_SRC + 'js_ext/',
            src: '**/*',
            dest: WWW_BUILD + "js/"
        }, {
            expand: true,
            cwd: WWW_SRC + 'img/',
            src: '**/*.{svg,png,jpg,jpeg,gif,json}',
            dest: WWW_BUILD + "img/"
        }, {
            expand: true,
            cwd: WWW_SRC + 'fonts/',
            src: '**/*',
            dest: WWW_BUILD + "fonts/"
        }, {
            expand: true,
            cwd: WWW_SRC + 'favicon/',
            src: '**/*',
            dest: WWW_BUILD + "favicon/"
        }]
    };

    // config['string-replace'] = {};
    // config['string-replace'].www = {
    //     files: [{
    //         src: WWW_BUILD + "index.html",
    //         dest: WWW_BUILD + "index.html"
    //     }],
    //     options: {
    //         replacements: [{
    //             pattern: '{{VERSION}}',
    //             replacement: PACKAGE.version
    //         }]
    //     }
    // };

    grunt.initConfig(config);

    require('load-grunt-tasks')(grunt); // Automatically loads all grunt tasks.
    // jfc why isn't this just included by default

    grunt.registerTask('default', [
        "www-clean"
    ]);

    grunt.registerTask('www-clean', [
        'clean:www',
        'www'
    ]);

    grunt.registerTask('www', [
        'sass:www',
        'replace:www',
        'htmlmin:www',
        'babel:www',
        'uglify:www',
        'copy:www'
    ]);

};