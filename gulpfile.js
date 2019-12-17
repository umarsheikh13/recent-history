
/**
 * This gulpfile builds both versions of the extension.
 *
 * gulp build-rh 	Builds Recent History in the recenthistory directory
 * gulp build-rhti 	Builds Recent History (Toolbar Icon) in the recenthistory-ti directory
 */

'use strict';

// Load plugins

var gulp = require('gulp');
var runSequence = require('gulp4-run-sequence');
var p = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'run-sequence', 'path', 'del']
});

// Package

var pkg = require('./package.json');

// Configuration

var config = {};
	config.src_dir = 'src';
	config.rh_dir = 'recenthistory';

// Delete dist directory

gulp.task('delete', function() {
	return p.del(config.rh_dir);
});

// Move

gulp.task('move', function() {
	return gulp.src(p.path.join(config.src_dir, '**'))
		.pipe(gulp.dest(config.rh_dir));
});

// Update files

gulp.task('update-files', function() {
	return gulp.src([
			p.path.join(config.rh_dir, 'manifest.json'),
			p.path.join(config.rh_dir, 'scripts', 'func.js'),
			p.path.join(config.rh_dir, 'options.html')
		])
		.pipe(p.replace(/{{NAME}}/g, 'Recent History'))
		.pipe(p.replace(/{{VERSION}}/g, pkg.version))
		.pipe(p.replace(/{{ACTION}}/g, 'page_action'))
		.pipe(p.replace(/{{ACTIONALT}}/g, 'pageAction'))
		.pipe(gulp.dest(config.rh_dir));
});

// Build Recent History

gulp.task('build', function(done) {
    runSequence('delete', 'move', 'update-files', done);
});
