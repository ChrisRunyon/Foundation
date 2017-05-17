var path = require('path');
var gulp = require('gulp');
var rimraf   = require('rimraf');
var sequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var compressor = require('gulp-compressor');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var mocha = require('gulp-mocha');

// Define wildcard folder pathnames
var PATHS = {
    html: [
        'controller/**/*.html',
        'default/**/*.html',
        'framework/events/**/*.html',
        'framework/models/**/*.html',
        'framework/modules/containers/**/*.html',
        'framework/modules/grid/**/*.html',
        'framework/modules/list/**/*.html',
        'framework/modules/topbar/**/*.html',
        'libraries/**/*.html',
        //'templates/modules/containers/**/*.html',
        //'templates/modules/grid/**/*.html',
        //'templates/modules/list/**/*.html',
        //'templates/modules/topbar/**/*.html',
        //'templates/views/**/*.html',
        //'views/**/*.html'
    ],
    js: [
        'apps/index/**/*.js',
        'apps/details/**/*.js',
        'controller/**/*.js',
        'default/**/*.js',
        'framework/events/**/*.js',
        'framework/models/**/*.js',
        'framework/modules/containers/**/*.js',
        'framework/modules/grid/**/*.js',
        'framework/modules/list/**/*.js',
        'framework/modules/topbar/**/*.js',
        'libraries/**/*.js',
        'templates/modules/containers/**/*.js',
        'templates/modules/grid/**/*.js',
        'templates/modules/list/**/*.js',
        'templates/modules/topbar/**/*.js',
        'templates/views/**/*.js',
        'views/**/*.js'
    ],
    css: [
        '../../src/css/**/*.css'
    ],
    index: [
        '../../src/index.html'
    ],
    config: [
        '../../src/config/requirejs.config.js'
    ],
    json: [
        'stubs/*.json'
    ],
    images: [
        '../../src/images/*.jpg'
    ],
    test: [
        'apps/index/test/*.html',
        'apps/details/test/*.html'
    ]
};

// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function(done) {
    rimraf('../../dist', done);
});

gulp.task('test', function () {
    return gulp
    .src(PATHS.test, {"base":"."})
    .pipe(mochaPhantomJS({
        reporter: 'tap',
        phantomjs: {
            viewportSize: {
                width: 1024,
                height: 768
            },
            useColors:true
        }
    }));
});

gulp.task('minscripts', function() {
  gulp.src(PATHS.js, {"base":"."})
    .pipe(uglify({mangle:false}))
    .pipe(gulp.dest('../../dist/src/js'));
});

gulp.task('minhtml', function() {
    gulp.src(PATHS.html, {"base":"."})
    .pipe(compressor({
            'remove-intertag-spaces': true,
            'compress-js': true,
            'compress-css': true,
        }))
    .pipe(gulp.dest('../../dist/src/js'));
});

gulp.task('minjson', function() {
    gulp.src(PATHS.json, {"base":"."})
    .pipe(gulp.dest('../../dist/src/js'));
});

gulp.task('copyimages', function() {
    gulp.src(PATHS.images, {"base":"."})
    .pipe(gulp.dest('../../dist/src/js'));
});

gulp.task('mincss', function() {
    gulp.src(PATHS.css, {"base":"."})
    .pipe(minifyCss())
    .pipe(gulp.dest('../../dist/src/css'));
});

gulp.task('cpindex', function() {
    gulp.src(PATHS.index, {"base":"."})
    .pipe(gulp.dest('../../dist/src/'));
});

gulp.task('config', function() {
  gulp.src(PATHS.config, {"base":"."})
    .pipe(uglify({mangle:false}))
    .pipe(gulp.dest('../../dist/src/config'));
});

// Build the "dist" folder by running all of the above tasks
gulp.task('default', function(done) {
    sequence('clean', 'test', 'minscripts', 'minhtml', 'minjson', 'copyimages', 'mincss', 'cpindex', 'config', done);
});
