var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var runSequence = require('run-sequence');
// var stripDebug = require('gulp-strip-debug');

var minifyCss = require('gulp-minify-css');


var paths = {
    scripts: [
            // VENDOR SCRIPTS
              'public/vendor/angular/angular.js'
            , 'public/vendor/angular-resource/angular-resource.min.js'
            , 'public/vendor/angular-route/angular-route.min.js'
            , 'public/vendor/angular-sanitize/angular-sanitize.min.js'
            , 'public/vendor/highlightjs/highlight.pack.min.js'
            , 'public/vendor/marked/lib/marked.js'
            , 'public/vendor/angular-marked/dist/angular-marked.min.js'
            , 'public/vendor/moment/moment.js'
            , 'public/vendor/angular-moment/angular-moment.js'
            , 'public/vendor/satellizer/satellizer.min.js'
            , 'public/vendor/angular-bootstrap/ui-bootstrap.min.js'
            , 'public/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js'
            , 'public/vendor/jquery/dist/jquery.min.js'
            , 'public/vendor/bootstrap/dist/js/bootstrap.min.js'

            // APP SCRIPTS
            , 'public/js/**/*.js' 
             ]

  , images: 'client/img/**/*'
  , styles: [ 
               'public/css/*.css'
             , 'public/vendor/bootstrap/dist/css/bootstrap.min.css'
             , 'public/vendor/bootstrap/dist/css/cosmo.css'
             , 'public/vendor/animate.css/animate.min.css'
             , 'public/vendor/highlightjs/styles/monokai.css'
             , 'public/vendor/angular-bootstrap/ui-bootstrap-csp.css'
            ]
};

// Lint Task
// gulp.task('lint', function() {
//     return gulp.src('js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

// Compile Our Sass
// gulp.task('sass', function() {
//     return gulp.src('scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('css'));
// });

// Concatenate & Minify Css
gulp.task('styles', function() {
  console.log('minifying css')
  gulp.src(paths.styles)
      .pipe(minifyCss())
      .pipe(concat('all.min.css'))
      // .pipe(rename('all.min.css'))
      .pipe(gulp.dest('public/dist'))
})

gulp.task('clean', function() {
  console.log('cleaning')
  return del('public/dist/all.js');
})

// Concatenate & Minify JS
gulp.task('scripts', function() {
  console.log('concatinating scripts')
  return gulp.src(paths.scripts)
      .pipe(concat('all.js'))
      // .pipe(stripDebug())
      .pipe(gulp.dest('public/dist'))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/dist'));
});

// gulp.task('watch', function() {
//     gulp.watch('js/*.js', ['lint', 'scripts']);
//     gulp.watch('scss/*.scss', ['sass']);
// });

// Default Task
gulp.task('build', function (cb) {
  runSequence('scripts', ['styles', 'clean'], cb);
}); // , 'watch'