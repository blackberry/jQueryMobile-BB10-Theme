/*
* Copyright 2012 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and 
* limitations under the License.
*/

/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            filePrefix: 'BlackBerry-JQM',
            banner:'/* \n' +
				'*  Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
				'*\n' +
				'* Copyright 2012 Research In Motion Limited.\n' +
				'*\n' +
				'* Licensed under the Apache License, Version 2.0 (the "License");\n' +
				'* you may not use this file except in compliance with the License.\n' +
				'* You may obtain a copy of the License at\n' +
				'*\n' +
				'* http://www.apache.org/licenses/LICENSE-2.0\n' +
				'*\n' +
				'* Unless required by applicable law or agreed to in writing, software\n' +
				'* distributed under the License is distributed on an "AS IS" BASIS,\n' +
				'* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n' +
				'* See the License for the specific language governing permissions and \n' +
				'* limitations under the License.\n' +
				'*/\n'
        },

        lint: {
            files: ['grunt.js', 'plugins/**/*.js', 'tests/**/*.js']
        },
        htmllint: {
            all: ["kitchensink/*.html", "samples/*.html"]
        },
        concat: {
            less: {
                src: ['<file_strip_banner:less/variables.less>',
                    '<file_strip_banner:less/mixins.less>', '<file_strip_banner:less/swatches.less>',
                    '<file_strip_banner:less/button.less>', '<file_strip_banner:less/titlebar.less>', 
					'<file_strip_banner:less/textinput.less>', '<file_strip_banner:less/segmentedcontrol.less>',
					'<file_strip_banner:less/list.less>', '<file_strip_banner:less/slider_toggle.less>',
					'<file_strip_banner:less/radiocheck.less>','<file_strip_banner:less/containers.less>',
					'<file_strip_banner:less/pageloader.less>','<file_strip_banner:less/controlgroup.less>',
					'<file_strip_banner:less/collapsible.less>','<file_strip_banner:less/misc.less>'
                ],
                dest: 'dist/<%= pkg.name %>.less'
            },
            theme_js: {
                src: ['<banner:meta.banner>',
                    '<file_strip_banner:plugins/actionbar/jquery.mobile.actionbar.js>',
					'<file_strip_banner:plugins/activityIndicator/jquery.mobile.activityindicator.js>',
					'<file_strip_banner:plugins/buttonGroup/jquery.mobile.buttonGroup.js>',
                    '<file_strip_banner:plugins/gridview/jquery.mobile.gridview.js>',
					'<file_strip_banner:plugins/inputValidator/jquery.mobile.inputValidator.js>',
                    '<file_strip_banner:plugins/progressbar/jquery.mobile.progressbar.js>',
                    '<file_strip_banner:plugins/dropdown/jquery.mobile.dropdown.js>'
                ],
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.js'
            },
            theme_css : {
                src: ['<banner:meta.banner>', '<config:less.all.dest>',
                    '<file_strip_banner:plugins/actionbar/jquery.mobile.actionbar.css>',
					'<file_strip_banner:plugins/activityIndicator/jquery.mobile.activityindicator.css>',
					'<file_strip_banner:plugins/buttonGroup/jquery.mobile.buttonGroup.css>',
                    '<file_strip_banner:plugins/gridview/jquery.mobile.gridview.css>',
					'<file_strip_banner:plugins/inputValidator/jquery.mobile.inputValidator.css>',
                    '<file_strip_banner:plugins/overflowMenu/jquery.mobile.overflowMenu.css>',
                    '<file_strip_banner:plugins/progressbar/jquery.mobile.progressbar.css>',
                    '<file_strip_banner:transitions/jquery.mobile.transition.cover.css>',
                    '<file_strip_banner:plugins/dropdown/jquery.mobile.dropdown.css>'
                ],
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.css'
            },
            init_js: {
                src: 'init/<%= pkg.name %>-Init.js',
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>-Init-<%= pkg.version %>.js'
            },
            all_js: {
                src: ['lib/jquery-1.7.1.js', '<config:concat.init_js.dest>',
                    'lib/jquery.mobile-1.2.0-alpha.1.js', '<config:concat.theme_js.dest>'
                ],
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>-all-<%= pkg.version %>.js'
            },
            all_css: {
                src: ['lib/jquery.mobile.structure-1.2.0-alpha.1.css', '<config:concat.theme_css.dest>'],
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>-all-<%= pkg.version %>.css'
            },


            latest_theme_js: {
                src: '<config:concat.theme_js.dest>',
                dest: 'dist/<%= pkg.name %>.js'
            },
            latest_theme_css: {
                src: '<config:concat.theme_css.dest>',
                dest: 'dist/<%= pkg.name %>.css'
            },
            latest_all_js: {
                src: '<config:concat.all_js.dest>',
                dest: 'dist/<%= pkg.name %>-all.js'
            },
            latest_all_css: {
                src: '<config:concat.all_css.dest>',
                dest: 'dist/<%= pkg.name %>-all.css'
            }

        },
        less: {
            all: {
                src: '<config:concat.less.dest>',
                dest: 'dist/<%= pkg.name %>-Less.css'
            }
        },
        min: {
            init: {
                src: '<config:concat.init_js.dest>',
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>-Init-<%= pkg.version %>.min.js'
            },
            dist: {
                src: '<config:concat.theme_js.dest>',
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.min.js'
            },
            all: {
                src: '<config:concat.all_js.dest>',
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>-all-<%= pkg.version %>.min.js'
            }
        },
        cssmin: {
            dist: {
                src: '<config:concat.theme_css.dest>',
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.min.css'
            },
            all: {
                src: ['<config:concat.all_css.dest>'],
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>-all-<%= pkg.version %>.min.css'
            }
        },
        watch: {
            watchables: {
                files: ['<config:lint.files>', 'less/*.less', 'plugins/**/*.css'],
                tasks: 'default'
            }
        },
        clean: {
            dist: "dist/"
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: false,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                jQuery: true,
                "$": true,
                module: true,
                ok: true,
                test: true,
                asyncTest: true,
                same: true,
                start: true,
                stop: true,
                expect: true,
                equal: true,
                notEqual: true
            }
        },
        uglify: {},
        exec: {
            samples: {
                command: 'open samples/index.html'
            }
        },
        copy: {
            latest_images: {
                src: 'assets/*.png',
                dest: 'dist/images_bb/'
            },
            latest_plugin_images: {
                src: 'plugins/**/*.png',
                dest: 'dist/images_bb/'
            },
            images: {
                src: 'assets/*.png',
                dest: 'dist/<%= pkg.version %>/images_bb/'
            },
            plugin_images: {
                src: 'plugins/**/*.png',
                dest: 'dist/<%= pkg.version %>/images_bb/'
            },
            init_js: {
                src: 'init/<%= pkg.name %>-Init.js',
                dest: 'dist/'
            },
            latest_all_min_js: {
                src: '<config:min.all.dest>',
                dest: 'dist/<%= pkg.name %>-all.min.js'
            },
            latest_all_min_css: {
                src: '<config:cssmin.all.dest>',
                dest: 'dist/<%= pkg.name %>-all.min.css'
            }
        }
    });

    // Default task.
    grunt.registerTask('default', 'concat:less less concat min cssmin copy');
    grunt.registerTask('htmllint', 'htmllint');
    grunt.registerTask('samples', 'exec:samples');
    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-less');
    grunt.loadNpmTasks('grunt-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadTasks('tasks');
};
