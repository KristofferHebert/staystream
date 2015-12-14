module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'less:dev',
		'browserify',
		'sync:dev',
		'coffee:dev'
	]);
};
