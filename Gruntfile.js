/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
        jslint: {
            files: ['src/**/*.js', 'spec/*.js'],
            directives: {
                browser: true,
                nomen: true,
                unparam: true,
                todo: true
            }
        },
        jasmine: {
            suite: {
                src: 'src/**/*.js',
                options: {
                    specs: 'spec/*_spec.js',
                    //helpers: 'spec/helpers/*.js',
                    vendor: 'lib/*.js',
                    junit: {
                        path: "reports/jasmine/",
                        consolidate: true
                    },
                    keepRunner: true,
                    //template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                            coverage: 'reports/jasmine/coverage.json',
                            report: 'coverage/client'
                    }
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js', 'spec/*.js'],
                tasks: ['js'],
                options: {
                    debounceDelay: 250,
                }
            },
            styles: {
                files: 'src/**/*.scss',
                tasks: ['css'],
                options: {
                    debounceDelay: 250,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('js', ['jslint', 'jasmine']);
    grunt.registerTask('default', ['js']);

};
