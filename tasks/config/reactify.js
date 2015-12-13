module.exports = function (grunt) {
    grunt.config.set('reactify', {
        'js/main.js': 'js/component/**/*.jsx'
    });

    grunt.loadNpmTasks('grunt-reactify')
};
