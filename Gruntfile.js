'use strict';

require('connect-livereload')({
    port: 35729
});

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            rebooted: {
                files: ['.rebooted'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['public/javascripts/**/*'],
                //tasks: ['jshint'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['public/views/**/*'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['public/stylesheets/**/*.{scss,sass}'],
                options: {
                    livereload: true
                }
            },
        },
        nodemon: {
            dev: {
                script: 'bin/www',
                options: {
                    //args: [],
                    ignore: ['node_modules/**', 'public/**'],
                    ext: 'js,coffee,hbs',
                    debug: true,
                    delay: 10,
                    env: {
                        PORT: 3000 // TODO
                    },
                    cwd: __dirname,
                    //nodeArgs: '',
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        // refreshes browser when server reboots
                        nodemon.on('restart', function () {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('fs').writeFileSync('.rebooted', 'rebooted' + Date.now());
                            }, 100);
                        });
                    }

                }
            }
        },
        concurrent: {
            tasks: [
                'nodemon',
                'watch'
            ],
            options: {
                logConcurrentOutput: true
            }
        },
    });

    grunt.registerTask('server', function(target){
      grunt.option('force', true);

      grunt.task.run([
          'concurrent'
      ]);
    });

    grunt.registerTask('default', [
        'server'
    ]);
};