module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            build: {
                files: [{
                    expand: true,
                    src: ['assets/**/*', 'content/**/*', 'layouts/**/*', 'meta/**/*', 'pages/**/*', 'partials/**/*', ' theme.yaml'],
                    dest: "build/"
                }]
            },
            dist: {
                files: [{
                    cwd: 'build/',
                    expand: true,
                    src: ['**', 'theme.yaml'],
                    dest: "../prod-greenfields"
                }]
            }
        },
        clean: {
            build: "build/"
            // release: ["path/to/another/dir/one", "path/to/another/dir/two"]
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'build/assets/css/app.css': 'build/assets/chefpaul-theme/lib/chefpaul.scss'
                }
            },
            watch: {
                files: {
                    'assets/css/app.css': 'assets/chefpaul-theme/lib/chefpaul.scss'
                }
            }
        },
        concat: {
            build: {
                src: [
                    'build/assets/javascript/jquery.js',
                    'build/assets/javascript/plugins/**/*.js',
                    'build/assets/javascript/plugins/**/*.js',
                    'build/assets/vendor/bootstrap/js/tooltip.js',
                    'build/assets/vendor/**/*.js',
                    'build/assets/javascript/app.js',
                    'build/assets/javascript/repute-scripts.js',
                    '../../modules/system/assets/js/framework.js',
                    '../../modules/system/assets/js/framework.extras.js',
                    '!**/*.min.js'],
                dest: 'build/assets/javascript/greenfields.js'
            }
        },
        cssmin: {
            build: {
                files: {
                    'build/assets/css/app.min.css': ['build/assets/css/app.css']
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'build/assets/javascript/greenfields.min.js': ['build/assets/javascript/greenfields.js']
                }
            }
        },
        usemin: {
            // js: 'build/layouts/default.htm',
            html: 'build/layouts/default.htm',
            options: {
                flow: {
                    html: {
                        steps: {
                            js: [],
                            css: []
                        }
                    }
                }
            }
        },
        watch: {
            css: {
                files: ['assets/chefpaul-theme/lib/**/*.scss'],
                tasks: ['sass:watch']
            }
        }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task(s).
    grunt.registerTask('dev-build', ['clean:build', 'copy:build', 'sass:dist', 'cssmin:build', 'concat:build', 'uglify', 'usemin', "copy:dist"]);
    grunt.registerTask('dev-clean', ['clean:build']);
};