
/**
 * This gulpfile builds both versions of the extension.
 *
 * gulp build-rh 	Builds Recent History in the recenthistory directory
 * gulp build-rhti 	Builds Recent History (Toolbar Icon) in the recenthistory-ti directory
 */

'use strict';

// Load plugins

var gulp = require('gulp');
var p = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'run-sequence', 'path', 'del']
});

// Package

var pkg = require('./package.json');

// Configuration

var config = {};
	config.src_dir = 'src';
	config.rh_dir = 'recenthistory';
	config.rhti_dir = 'recenthistory-ti';

// Recent History

	// Delete dist directory

	gulp.task('delete-rh', function() {
		return p.del(config.rh_dir);
	});

	// Move 

	gulp.task('move-rh', function() {
		return gulp.src(p.path.join(config.src_dir, '**'))
			.pipe(gulp.dest(config.rh_dir));
	});

	// Update files

	gulp.task('update-files-rh', function() {
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

// Recent History (Toolbar Icon)

	// Delete dist directory

	gulp.task('delete-rhti', function() {
		return p.del(config.rhti_dir);
	});

	// Move 

	gulp.task('move-rhti', function() {
		return gulp.src(p.path.join(config.src_dir, '**'))
			.pipe(gulp.dest(config.rhti_dir));
	});

	// Update files

	gulp.task('update-files-rhti', function() {
		return gulp.src([
				p.path.join(config.rhti_dir, 'manifest.json'),
				p.path.join(config.rhti_dir, 'scripts', 'func.js'),
				p.path.join(config.rhti_dir, 'options.html')
			])
			.pipe(p.replace(/{{NAME}}/g, 'Recent History (Toolbar Icon)'))
			.pipe(p.replace(/{{VERSION}}/g, pkg.version))
			.pipe(p.replace(/{{ACTION}}/g, 'browser_action'))
			.pipe(p.replace(/{{ACTIONALT}}/g, 'browserAction'))
			.pipe(gulp.dest(config.rhti_dir));
	});

// Build Recent History

gulp.task('build-rh', function(done) {
    p.runSequence('delete-rh', 'move-rh', 'update-files-rh', done);
});

// Build Recent History (Toolbar Icon)

gulp.task('build-rhti', function(done) {
    p.runSequence('delete-rhti', 'move-rhti', 'update-files-rhti', done);
});
