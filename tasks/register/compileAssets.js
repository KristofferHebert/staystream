module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
		'less:dev',
		'browserify',
		'copy:dev',
		'coffee:dev',
	]);
};
