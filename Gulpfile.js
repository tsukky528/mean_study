var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function(){
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass({errLogToConsole:true}))
        .pipe(autoprefixer('last 10 version'))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch-sass', function(){
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

var globby = require('globby');
var template = require('gulp-template');

gulp.task('index', function(){
    return globby(['public/assets/css/**/*.css','public/assets/js/**/*.js'], null, function(err, files){
      files = files.map(function(file){
        return file.replace('public', '');
      });
      var cssFiles = files.filter(function(file){
        return file.match(/\.css$/);
      });
      var jsFiles = files.filter(function(file){
        return file.match(/\.js$/);
      });
      return gulp.src('src/index.html')
          .pipe(template({
              styles:cssFiles,
              scripts:jsFiles
          }))
          .pipe(gulp.dest('public'));
    });
});

var runSequence = require('run-sequence');

gulp.task('watch-index', function(){
  gulp.watch(['public/assets/css/**/*.css', 'src/index.html', 'public/assets/js'], ['index']);
});

gulp.task('js', function(){
    return gulp.src('src/**/*.js')
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('watch-js', function(){
  gulp.watch('src/**/*.js', ['js']);
});

gulp.task('watch', ['watch-sass', 'watch-index', 'watch-js']);

var nodemon = require('gulp-nodemon');

gulp.task('server', function(){
    nodemon({
        script:'server.js',
        watch:['public/**/*', 'app/**/*.js'],
        ext: 'js html'
    })
        .on('restart', function(){
          console.log('Server restarting!')
    });
});

gulp.task('default', function(){
    return runSequence(['sass', 'js'], 'index', ['watch', 'server']);
});

