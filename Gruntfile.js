/**
 * @license Copyright 2011-2014 BitPay Inc., MIT License 
 * see https://github.com/bitpay/woocommerce-plugin/blob/master/LICENSE
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: ['dist'],
      dev: {
        src: ['/var/www/html/woocommerce/wp-content/plugins/globee-for-woocommerce/'],
        options: {
          force: true
        }
      }
    },
    compress: {
      build: {
        options: {
          archive: 'dist/globee-for-woocommerce.zip'
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['**']
        }]
      }
    },
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/**.php', 'assets/js/**/**.*', 'assets/img/**/**.*', 'templates/**/**.*'],
            dest: 'dist/globee-for-woocommerce'
          },
          {
            expand: true,
            cwd: 'vendor/paybee/php-client/src/',
            src: ['**/**.*'],
            dest: 'dist/globee-for-woocommerce/lib'
          },
          {
            src: 'readme.txt',
            dest: 'dist/globee-for-woocommerce/readme.txt'
          },
          {
            src: 'LICENSE',
            dest: 'dist/globee-for-woocommerce/license.txt'
          }
        ]
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'dist/globee-for-woocommerce',
          src: ['**/**'],
          dest: '/var/www/html/woocommerce/wp-content/plugins/globee-for-woocommerce/'
        }]
      }
    },
    cssmin: {
      build: {
        options: {
          banner: '/**\n * @license Copyright 2011-2014 BitPay Inc., MIT License\n * see https://github.com/paybee/woocommerce-plugin/blob/master/LICENSE\n */'
        },
        files: {
          'dist/globee-for-woocommerce/assets/css/style.css': ['src/assets/css/**.css']
        }
      }
    },
    phpcsfixer: {
        build: {
            dir: 'src/'
        },
        options: {
            bin: 'vendor/bin/php-cs-fixer',
            diff: true,
            ignoreExitCode: true,
            level: 'all',
            quiet: true
        }
    },
    watch: {
      scripts: {
        files: ['src/**/**.*'],
        tasks: ['dev'],
        options: {
          spawn: false,
          atBegin: true
        },
      },
    },
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-php-cs-fixer');

  // Default task(s).
  grunt.registerTask('build', ['phpcsfixer', 'clean:build', 'cssmin:build', 'copy:build', 'compress:build']);
  grunt.registerTask('dev', ['build', 'clean:dev', 'copy:dev']);
  grunt.registerTask('default', 'build');

};

