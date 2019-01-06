const {
    series,
    parallel,
    src,
    dest,
    watch
} = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();
const indexFolder = require('gulp-file-include');
var fs = require('fs')

function sass1() {
    const variables = {
        // variables to sass
    };
    return src([
            'src/scss/bundle/style-rtl.scss',
            'src/scss/bundle/style-ltr.scss'

        ])
        // .pipe(sassVars(variables, {
        //     verbose: true
        // }))
        .pipe(sass({
            //    outputStyle: 'compressed'
        }))
        //  .pipe(autoprefixer('last 5 versions'))
        .pipe(dest('dist/css'));
    //   .pipe(browsersync.stream());
}
function serve() {
    browsersync.init({
        server: 'dist'
    });
    watch(['src/**/*.scss'], sass1);
    //  watch('src/**/*.html', indexFolder1);
}
exports.default = series(sass1, serve);