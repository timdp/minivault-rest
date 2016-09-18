import gulp from 'gulp'
import loadPlugins from 'gulp-load-plugins'
import del from 'del'
import seq from 'run-sequence'

const $ = loadPlugins()

gulp.task('clean', () => del('lib'))

gulp.task('transpile', () => {
  return gulp.src('src/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('lib'))
})

gulp.task('lint', () => {
  return gulp.src('{src,test}/**/*.js')
    .pipe($.standard())
    .pipe($.standard.reporter('default', {breakOnError: false}))
})

gulp.task('test', ['lint'])

gulp.task('build', (cb) => seq('test', 'clean', 'transpile', cb))

gulp.task('watch', () => gulp.watch('{src,test}/**/*', ['build']))

gulp.task('default', ['build'], () => gulp.start('watch'))
