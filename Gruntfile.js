/*!
 * Ghost-UI Gruntfile
 * http://ui.ghost.org
 * Copyright 2014 Ghost Foundation.
 * Licensed under MIT (https://github.com/TryGhost/Ghost-UI/blob/master/LICENSE)
 */

module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function (string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    // load all grunt tasks
    require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
        clean: {
            dist: ['dist', 'docs/dist']
        },

        copy: {
            fonts: {
                expand: true,
                src: 'fonts/*',
                dest: 'dist/'
            },
            docs: {
                expand: true,
                cwd: './dist',
                src: [
                    '{css,js}/*.min.*',
                    'css/*.map',
                    'fonts/*'
                ],
                dest: 'docs/dist'
            }
        },

        sass: {
            dist: {
                files: {
                    'dist/css/<%= pkg.name %>.css': 'sass/screen.scss'
                }
            },
            compress: {
                options: {
                    'outputStyle': 'compressed'
                },
                files: {
                    'dist/css/<%= pkg.name %>.min.css': 'sass/screen.scss'
                }
            }
        }
    });

    // JS distribution task.
    // grunt.registerTask('dist-js', ['concat', 'uglify']);

    // CSS distribution task.
    grunt.registerTask('dist-css', ['sass']);

    // Docs distribution task.
    grunt.registerTask('dist-docs', 'copy:docs');

    // Full distribution task
    grunt.registerTask('dist', ['clean', 'dist-css', 'copy:fonts', 'dist-docs']);
    grunt.registerTask('default', 'Build CSS, JS & templates for development', ['dist']);

};
