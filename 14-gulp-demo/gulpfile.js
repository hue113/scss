const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
  -- TOP LEVEL FUNCTIONS 
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

// Logs Message
gulp.task('message', async function(){
    return console.log('Gulp is running...');
});

// Copy All HTML files
gulp.task('copyHtml', async function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Optimize Images          (npm install --save-dev gulp-imagemin)
gulp.task('imageMin', async () =>
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);

// Minify JS                (npm install --save-dev gulp-uglify)
gulp.task('minify', async function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Compile Sass             (npm install gulp-sass --save-dev)
gulp.task('sass', async function(){
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// Scripts                  (npm install --save-dev gulp-concat)
//                          (npm install --save-dev gulp-uglify)
gulp.task('scripts', async function(){
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Run many tasks at once   (Terminal command: gulp OR gulp default)
gulp.task('default', gulp.series('message', 'copyHtml', 'imageMin', 'sass', 'scripts'));


// watch changes automatically
gulp.task('watch', async function(){
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyHtml'));
  });