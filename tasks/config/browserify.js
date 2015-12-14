module.exports = function(grunt) {

  grunt.config.set('browserify', {
      options:      {
        transform:  [ require('grunt-react').browserify ],
        extension: 'jsx'
      },
      app:          {
        src:        'assets/js/main.jsx',
        dest:       '.tmp/public/js/main.js'
      }
  })

  grunt.loadNpmTasks('grunt-browserify')
}
