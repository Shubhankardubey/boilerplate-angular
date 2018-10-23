const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

// destination directory
const DEST_DIR = 'dist';

// add js only files for compilation
const COMPILE_GLOBS = [
  // all js files in /server
  'server/**/*.js',
];

// add js only files for linting
const LINT_GLOBS = [
  // all js files in root
  '*.js',
  // all js files in /server
  'server/**/*.js',
];

// NOTE: stream is returned in every task to signal async completion

gulp.task('compile', () => gulp.src(COMPILE_GLOBS)
  .pipe(babel({
    presets: ['env'],
    plugins: ['transform-runtime'],
  }))
  .pipe(gulp.dest(DEST_DIR)));

// linting via gulp
// pipe #1 - pass it to eslint plugin (no explicit options, let eslintrc handle this)
// pipe #2 - format the results in default format
// pipe #3 - fail only after processing all the files
// noinspection JSCheckFunctionSignatures
gulp.task('lint', () => gulp.src(LINT_GLOBS)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('build', ['compile']);
