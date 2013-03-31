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
		pkg: grunt.file.readJSON('package.json'),
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
		htmllint: {
			all: ["kitchensink/*.html", "samples/*.html"]
		},
		concat: {
			less: {
				src: ['<file_strip_banner:src/less/variables.less>',
					'<file_strip_banner:src/less/mixins.less>', '<file_strip_banner:src/less/swatches.less>',
					'<file_strip_banner:src/less/button.less>', '<file_strip_banner:src/less/titlebar.less>',
					'<file_strip_banner:src/less/textinput.less>', '<file_strip_banner:src/less/segmentedcontrol.less>',
					'<file_strip_banner:src/less/list.less>', '<file_strip_banner:src/less/slider_toggle.less>',
					'<file_strip_banner:src/less/radiocheck.less>','<file_strip_banner:src/less/containers.less>',
					'<file_strip_banner:src/less/pageloader.less>','<file_strip_banner:src/less/controlgroup.less>',
					'<file_strip_banner:src/less/collapsible.less>','<file_strip_banner:src/less/misc.less>'
				],
				dest: 'compiled/<%= pkg.name %>.less'
			},
			theme_js: {
				src: ['<banner:meta.banner>',
					'<file_strip_banner:src/plugins/actionbar/jquery.mobile.actionbar.js>',
					'<file_strip_banner:src/plugins/activityIndicator/jquery.mobile.activityindicator.js>',
					'<file_strip_banner:src/plugins/buttonGroup/jquery.mobile.buttonGroup.js>',
					'<file_strip_banner:src/plugins/gridview/jquery.mobile.gridview.js>',
					'<file_strip_banner:src/plugins/inputValidator/jquery.mobile.inputValidator.js>',
					'<file_strip_banner:src/plugins/progressbar/jquery.mobile.progressbar.js>',
					'<file_strip_banner:src/plugins/dropdown/jquery.mobile.dropdown.js>'
				],
				dest: 'compiled/<%= pkg.name %>.js'
			},
			theme_css : {
				src: ['<banner:meta.banner>', '<%= less.all.dest %>',
					'<file_strip_banner:src/plugins/actionbar/jquery.mobile.actionbar.css>',
					'<file_strip_banner:src/plugins/activityIndicator/jquery.mobile.activityindicator.css>',
					'<file_strip_banner:src/plugins/buttonGroup/jquery.mobile.buttonGroup.css>',
					'<file_strip_banner:src/plugins/gridview/jquery.mobile.gridview.css>',
					'<file_strip_banner:src/plugins/inputValidator/jquery.mobile.inputValidator.css>',
					'<file_strip_banner:src/plugins/overflowMenu/jquery.mobile.overflowMenu.css>',
					'<file_strip_banner:src/plugins/progressbar/jquery.mobile.progressbar.css>',
					'<file_strip_banner:src/transitions/jquery.mobile.transition.cover.css>',
					'<file_strip_banner:src/plugins/dropdown/jquery.mobile.dropdown.css>'
				],
				dest: 'compiled/<%= pkg.name %>.css'
			},
			all_js: {
				src: ['src/lib/jquery-1.7.1.js', '<%= uglify.init.src %>',
					'src/lib/jquery.mobile.js', 'src/lib/panel.js', '<%= concat.theme_js.dest %>'
				],
				dest: 'compiled/<%= pkg.name %>-all.js'
			},
			all_css: {
				src: ['src/lib/jquery.mobile.structure.css', 'src/lib/jquery.mobile.panel.css', '<%= concat.theme_css.dest% >'],
				dest: 'compiled/<%= pkg.name %>-all.css'
			}
		},
		less: {
			all: {
				src: '<%= concat.less.dest %>',
				dest: 'compiled/<%= pkg.name %>-Less.css'
			}
		},
		uglify: {
			init: {
				src: 'src/init/<%= pkg.name %>-Init.js',
				dest: 'compiled/<%= pkg.name %>-Init.min.js'
			},
			dist: {
				src: '<%= concat.theme_js.dest %>',
				dest: 'compiled/<%= pkg.name %>.min.js'
			},
			all: {
				src: '<%= concat.all_js.dest %>',
				dest: 'compiled/<%= pkg.name %>-all.min.js'
			}
		},
		cssmin: {
			dist: {
				src: '<%= concat.theme_css.dest %>',
				dest: 'compiled/<%= pkg.name %>.min.css'
			},
			all: {
				src: ['<%= concat.all_css.dest %>'],
				dest: 'compiled/<%= pkg.name %>-all.min.css'
			}
		},
		watch: {
			watchables: {
				files: ['<%= lint.files %>', 'src/less/*.less', 'src/plugins/**/*.css'],
				tasks: 'default'
			}
		},
		clean: {
			dist: "compiled/"
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
				browser: true,
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
			
			files: ['Gruntfile.js', 'src/plugins/**/*.js', 'tests/**/*.js']
		},
		copy: {
			images: {
				src: ['src/plugins/**/*.png', 'src/assets/*.png'],
				dest: 'compiled/images_bb/'
			},
			init_js: {
				src: 'src/init/<%= pkg.name %>-Init.js',
				dest: 'compiled/'
			},
			kitchenLib: {
				src: 'compiled/*-all*',
				dest: 'kitchenSink/lib/',
				exclude: [/min/]
			},
			latest: {
				src: 'compiled/*',
				dest: 'dist/latest/',
				exclude: [/less/i],
				modify : {
					pattern: /\./,
					text: '-<%= pkg.version %>'
				}
			},
			versioned: {
				src: 'compiled/*',
				dest: 'dist/<%= pkg.version %>/',
				exclude: [/less/i],
				modify : {
					pattern: /\./,
					text: '-<%= pkg.version %>'
				}
			}

		},
		imageEmbed: {
			less: {
				src:  '<%= less.all.dest %>',
				dest: '<%= less.all.dest %>',
				deleteAfterEncoding : false,
				options: {}
			},
			theme_css: {
				src:  '<%= concat.theme_css.dest %>',
				dest: '<%= concat.theme_css.dest %>',
				deleteAfterEncoding : false,
				options: {}
			}
		}
	});

	// Default task.
	grunt.registerTask('default', ['jshint', 'concat:less', 'less', 'copy:images', 'copy:init_js', 'imageEmbed:less', 'concat', 'imageEmbed:theme_css', 'concat:all_css', 'uglify', 'cssmin', 'copy:kitchenLib']);
	grunt.registerTask('latest', 'default copy:latest');
	grunt.registerTask('release', 'latest copy:versioned');
	grunt.registerTask('htmllint', 'htmllint');
	grunt.loadNpmTasks('grunt-html');
	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-image-embed');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadTasks('src/tasks');
};
