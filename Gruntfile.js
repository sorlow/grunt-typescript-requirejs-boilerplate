/* global module, require */
module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            build: ['public'],
            js: ['public/.tmp', 'public/js']
        },
        typescript: {
            src: {
                src: ['src/js/**/*.ts'],
                dest: 'public/.tmp',
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: true,
                    declaration: false
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "public/.tmp",
                    mainConfigFile: "public/.tmp/config.js",
                    name: "main",
                    out: "public/js/main.js",
                    optimize: "uglify2",
                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                    useSourceUrl: true
                }
            }
        },
        copy: {
            libs: {
                src: [
                    'jquery/dist/jquery{,*}.{js,map}',
                    'requirejs/require.js'
                ],
                cwd: 'bower_components',
                dest: "public/libs/",
                expand: true
            },
            index: {
                src: 'index.html',
                cwd: 'src',
                dest: "public/",
                expand: true
            }
        },
        watch: {
            js: {
                files: ['src/js/**/*.ts'],
                tasks: ['clean:js', 'typescript', 'requirejs'],
                options: {
                    interrupt: false
                }
            },
            index: {
                files: ['src/index.html'],
                tasks: ['copy:index']
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('build', ['clean:build', 'copy', 'typescript', 'requirejs']);
    grunt.registerTask('default', ['watch']);
};