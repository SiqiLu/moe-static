module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mbower: {
      copy: {
        options: {
          cleanTargetDir: false,
          cleanBowerDir: true,
          copy: true,
          install: false,
          targetDir: '.'
        }
      },
      clean: {
        options: {
          cleanTargetDir: true,
          cleanBowerDir: true,
          copy: false,
          install: false,
          targetDir: '.'
        }
      },
      install: {
        options: {
          cleanTargetDir: false,
          cleanBowerDir: true,
          copy: true,
          install: true,
          targetDir: '.'
        }
      }
    },

    mimage: {
      options: {
        interlaced: true,
        optimizationLevel: 5,
        progressive: true,
        removeSource: true,
        svgoPlugins: [{
            removeViewBox: false
          }, // don't remove the viewbox atribute from the SVG
          {
            removeUselessStrokeAndFill: false
          }, // don't remove Useless Strokes and Fills
          {
            removeEmptyAttrs: false
          } // don't remove Empty Attributes from the SVG
        ]

      },
      assets: {
        files: [{
          expand: true,
          cwd: 'assets/img/',
          src: '**/*.{gif,GIF,jpg,jpeg,JPG,png,PNG}',
          dest: 'moe_assets/img/'
        }]
      }
    },

    // Task configuration.
    clean: {
      dist: 'dist/**/*',
      npm: 'node_modules/',
      dev: 'moe_packages/moe-ui@dev/**/*',
      css: 'src/css/',
      js: 'src/js/*.js',
      docsTmp: 'docs/tmp/',
      docsDist: 'docs/dist/**/*'
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      grunt: {
        src: ['Gruntfile.js', 'grunt/**/*.js']
      },
      core: {
        src: ['src/**/*.js', '!src/**/*.min.js']
      },
      docs: {
        src: ['docs/**/*.js', '!docs/**/*.min.js']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      grunt: {
        src: ['Gruntfile.js', 'grunt/**/*.js']
      },
      core: {
        src: ['src/**/*.js', '!src/**/*.min.js']
      },
      docs: {
        src: ['docs/**/*.js', '!docs/**/*.min.js']
      }
    },

    concat: {
      options: {
        sourceMap: false
      },
      core: {
        src: [
          'src/js/components/transition.js',
          'src/js/components/alert.js',
          'src/js/components/button.js',
          'src/js/components/carousel.js',
          'src/js/components/collapse.js',
          'src/js/components/dropdown.js',
          'src/js/components/modal.js',
          'src/js/components/tooltip.js',
          'src/js/components/popover.js',
          'src/js/components/scrollspy.js',
          'src/js/components/tab.js',
          'src/js/components/affix.js'
        ],
        dest: 'src/js/<%= pkg.name %>.js'
      },
      ie10: {
        src: [
          'src/js/ie/ie10-*.js'
        ],
        dest: 'src/js/<%= pkg.name %>-ie10.js'
      }
    },

    uglify: {
      options: {
        preserveComments: false
      },
      core: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'src/js/<%= pkg.name %>.min.js'
      },
      ie10: {
        src: 'src/js/<%= pkg.name %>-ie10.js',
        dest: 'src/js/<%= pkg.name %>-ie10.min.js'
      }
    },

    less: {
      options: {
        strictMath: true,
        sourceMap: false,
        outputSourceFiles: false,
        sourceMapBasepath: 'src/',
        sourceMapRootpath: '../'
      },
      core: {
        options: {
          sourceMapURL: '<%= pkg.name %>.css.map'
        },
        files: {
          'src/css/<%= pkg.name %>.css': 'src/less/moe-ui.less'
        }
      },
      ie: {
        options: {
          sourceMapURL: '<%= pkg.name %>-ie.css.map'
        },
        files: {
          'src/css/<%= pkg.name %>-ie.css': 'src/less/<%= pkg.name %>-ie.less'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 5% in CN']
      },
      core: {
        src: ['src/css/*.css', '!src/css/*.min.css']
      },
      docs: {
        src: ['docs/src/css/*.css', '!docs/src/css/*.min.css']
      }
    },

    csscomb: {
      options: {
        config: '.csscomb.json'
      },
      core: {
        expand: true,
        cwd: 'src/css/',
        src: '**/*.css',
        dest: 'src/css/'
      },
      docs: {
        expand: true,
        cwd: 'docs/src/css/',
        src: '**/*.css',
        dest: 'docs/src/css/'
      }
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      core: {
        src: '<%= autoprefixer.core.src %>'
      },
      docs: {
        options: {
          csslintrc: '.csslintrc',
          ids: false
        },
        src: '<%= autoprefixer.docs.src %>'
      }
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '0',
        advanced: true
      },
      core: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'src/css',
          ext: '.min.css'
        }]
      }
    },

    mhandlebars: {
      options: {
        partialsDir: 'docs/src/partials/',
        compilerOptions: {
          noEscape: true
        }
      },
      docsTmp: {
        files: [{
          expand: true,
          cwd: 'docs/src/',
          src: '**/*.html',
          dest: 'docs/tmp/'
        }]
      },
      docs: {
        files: [{
          expand: true,
          cwd: 'docs/src/',
          src: '**/*.html',
          dest: 'docs/dist/'
        }]
      }
    },

    copy: {
      options: {
        timestamp: true
      },
      build: {
        expand: true,
        cwd: 'src/',
        src: ['css/**/*.css', 'fonts/**/**', 'js/*.js'],
        dest: 'moe_packages/moe-ui@dev/'
      },
      docs: {
        expand: true,
        cwd: 'docs/src/',
        src: ['assets/**/*', 'css/**/*', 'js/**/*', '*.ico'],
        dest: 'docs/dist'
      },
      release: {
        expand: true,
        cwd: 'moe_packages/moe-ui@dev/',
        src: '**',
        dest: 'dist/'
      }
    },

    exec: {
      options: {
        stdout: true,
        stderr: true
      },
      npmUpdate: {
        command: 'npm update'
      },
      npmInstall: {
        command: 'npm install'
      }
    },

    watch: {
      options: {
        debounceDelay: 5000
      },
      js: {
        files: ['Gruntfile.js', 'src/js/**/*.js'],
        tasks: []
      },
      css: {
        files: ['Gruntfile.js', 'src/less/**/*.less'],
        tasks: ['less-compile']
      },
      core: {
        files: ['Gruntfile.js', 'src/js/**/*.js', 'src/less/**/*.less', '!src/js/*.js'],
        tasks: ['build']
      },
      img: {
        files: ['assets/img/**/*.{gif,GIF,jpg,jpeg,JPG,png,PNG}'],
        tasks: ['mimage:assets']
      },
      docs: {
        files: ['docs/src/**/*.{html,json,css}'],
        tasks: ['build-docs']
      }
    }

  });

  // This command registers the default task which will install bower packages into wwwroot/lib
  grunt.registerTask('default', ['update', 'build', 'build-docs']);

  grunt.registerTask('install', ['mbower:install']);
  grunt.registerTask('update', ['exec:npmInstall', 'exec:npmUpdate', 'mbower:clean', 'install']);

  grunt.registerTask('dev', ['watch:core']);
  grunt.registerTask('dev-css', ['watch:css']);
  grunt.registerTask('dev-js', ['watch:js']);
  grunt.registerTask('dev-img', ['watch:img']);
  grunt.registerTask('dev-docs', ['watch:docs']);

  grunt.registerTask('before-compile', ['jscs:grunt', 'jshint:grunt']);
  grunt.registerTask('css-compile', ['clean:css', 'less:core', 'autoprefixer:core', 'csscomb:core', 'csslint:core', 'cssmin:core']);
  grunt.registerTask('js-compile', ['clean:js', 'jscs:core', 'jshint:core', 'concat', 'uglify']);
  grunt.registerTask('compile', ['before-compile', 'css-compile', 'js-compile']);

  grunt.registerTask('docs-css-compile', ['autoprefixer:docs', 'csscomb:docs', 'csslint:docs']);
  grunt.registerTask('docs-html-compile', ['mhandlebars:docsTmp', 'clean:docsTmp', 'clean:docsDist', 'mhandlebars:docs']);

  grunt.registerTask('build', ['clean:dev', 'compile', 'copy:build']);
  grunt.registerTask('build-docs', ['before-compile', 'docs-css-compile', 'docs-html-compile', 'copy:docs']);

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });
  require('time-grunt')(grunt);
};
