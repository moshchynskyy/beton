var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'), //PostCss asset
    rucksack = require('rucksack-css'), //PostCss asset
    autoprefixer = require('autoprefixer'), //PostCss asset
    // browserSync = require('browser-sync'),
    webserver = require('gulp-webserver'),
    notify = require('gulp-notify'),
    prettify = require('gulp-prettify');

  var processors = [
    autoprefixer({ browsers: ['last 15 versions'] }),
    rucksack ({
        fallbacks: true // for old browsers
    })
    // cssnano
  ];

const path = {
  build: {
    html: 'build/',
    css: 'build/css/',
    js: 'build/js/',
    img: 'build/images/',
    fonts: 'build/fonts/',
    php: 'build/php/',
    assets: 'build/external/'
  },
  src: {
    pug: 'src/templates/**/*.pug',
    sass: 'src/sass/**/*.scss',
    js: 'src/js/*.js',
    img: 'src/images/**/*',
    fonts: 'src/fonts/**/*',
    php: 'src/php/**/*.php',
    assets: 'src/external/**/*',
  },
  watch: {
    pug: 'src/templates/**/*.pug',
    sass: 'src/sass/**/*.scss',
    js: 'src/js/*.js',
    img: 'src/images/**/*',
    fonts: 'src/fonts/**/*',
    php: 'src/php/**/*.php',
    assets: 'src/external/**/*'
  }
};

// webserver
gulp.task('webserver', function() {
    gulp.src('build')
        .pipe(webserver({
            livereload: true,
            port: 4200,
            // directoryListing: true,
            open: true
        }));
});

//SERVER
// gulp.task('browser-sync', function() {
// 	browserSync({
// 		server: {
// 			baseDir: 'build'
// 		},
// 		notify: false
// 	});
// });

// HTML
gulp.task('html:build', function() {
  return gulp
    .src(path.watch.pug)
    .pipe(pug({ pretty: true }))
    .on("error", notify.onError())
    .pipe(prettify({ indent_size: 4 }))
    .pipe(gulp.dest(path.build.html))
    // .pipe(browserSync.reload({stream: true}));
});

// CSS
gulp.task('style:build', function() {
  return gulp
    .src('src/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    // .pipe(browserSync.reload({stream: true}));
});

// JS
gulp.task('js:build', function() {
  return gulp
    .src(path.src.js)
    .pipe(gulp.dest(path.build.js))
    // .pipe(browserSync.reload({stream: true}));
});

// IMAGES
gulp.task('image:build', function() {
	return gulp
    .src('src/images/**/*.*')
    .pipe(cache(imagemin({
      use: [pngquant({ quality: '75' })],
      progressive: true
    })))
  	.pipe(gulp.dest(path.build.img))
});

// FONTS
gulp.task('font:build', function() {
  return gulp
    .src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

// PHP
gulp.task('php:build', function() {
  return gulp
      .src(path.src.php)
      .pipe(gulp.dest(path.build.php))
      // .pipe(browserSync.reload({stream: true}));
});

// Assets
gulp.task('asset:build', function() {
  return gulp
    .src(path.src.assets)
    .pipe(gulp.dest(path.build.assets))
});

gulp.task('watch', ['html:build', 'style:build', 'js:build', 'image:build', 'font:build', 'php:build', 'asset:build', 'webserver'/*'browser-sync'*/], function() {
  gulp.watch(path.watch.pug, ['html:build']);
  gulp.watch(path.watch.sass, ['style:build']);
  gulp.watch(path.watch.js, ['js:build']);
  gulp.watch(path.watch.img, ['image:build']);
  gulp.watch(path.watch.fonts, ['font:build']);
  gulp.watch(path.watch.php, ['php:build']);
  gulp.watch(path.watch.assets, ['asset:build'])
});


gulp.task('default', ['watch']);
