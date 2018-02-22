module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/css/style.css': 'src/scss/style.scss'
                }
            }
        },
        copy: {
            dev: {
                files: [
                    {expand: true, cwd: 'src/', src: ['manifest.json'], dest: 'public/'},
                    {expand: true, cwd: 'src/media/', src: ['**'], dest: 'public/media/'},
                    {expand: true, cwd: 'src/fonts/', src: ['**'], dest: 'public/fonts/'}
                ],
            },
        },
        pug: {
            dev: {
                options: {
                    pretty: true
                },
                files: {
                    'public/index.html': 'src/index.pug',
                    'public/info.html': 'src/info.pug'
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    'node_modules/jqlite/jqlite.min.js',
                    'src/js/**/*.js'
                ],
                dest: 'public/js/scripts.js',
            },
        },
        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            pug: {
                files: ['src/**/*.pug'],
                tasks: ['pug'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            sass: {
                files: ['src/scss/**'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            media: {
                files: ['src/media/**', 'src/fonts/**'],
                tasks: ['copy'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
        },
        connect: {
            server: {
                options: {
                    port: 3000, // custom port
                    base: './public', // current directory for 'index.html' is root
                    keepalive: true, // keep the server alive indefinitely,
                    livereload: true
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['connect', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 12 versions', 'ie 10']
            },
            'public/css/style.css' : 'public/css/style.css'
        },
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'src/media/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/media/'
                }]
            }
        },
        clean: ['public']
    });

    // Default task(s).
    grunt.registerTask('default', ['copy','sass','pug', 'concat', 'autoprefixer', 'concurrent']);

    grunt.registerTask('build', ['clean','copy','sass', 'concat', 'pug', 'autoprefixer', 'imagemin']);

};
