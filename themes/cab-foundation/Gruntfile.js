module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    //compile the sass

    compass: {
      dist: {                   // Target
        options: {              // Target options
          sassDir: ['scss'],
          cssDir: 'css',
          environment: 'production',
          outputStyle: 'compressed'
        }
      }
    },

    //concat all the files into the build folder

    concat: {
      js:{
        src: [
          'bower_components/modernizr/modernizr.js',
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/foundation/js/foundation.min.js',
          '../../division-bar/js/division-bar.js',
          'javascript/*.js'
        ],
        dest: 'build/src/main_concat.js'
      }
    },

    //minify those concated files
    //toggle mangle to leave variable names intact

    uglify: {
      my_target:{
        files:{
        'build/build.js': ['build/src/main_concat.js'],
        }
      }
    },

    watch: {
      scripts: {
        files: ['js/*.js', 'js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: true,
        }
      },
      css: {
        files: ['scss/*.scss', 
                'scss/**/*.scss'
                ],
        tasks: ['compass'],
        options: {
          spawn: true,
        }
      }
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-watch');

  // Default task(s).
  // Note: order of tasks is very important
  grunt.registerTask('default', ['compass', 'concat', 'uglify', 'simple-watch']);

};