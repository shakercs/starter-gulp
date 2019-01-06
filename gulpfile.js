const {
    series,
    parallel,
    src,
    dest,
    watch
} = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();
const componentsFolder = require('gulp-file-include');
const indexFolder = require('gulp-file-include');
const sassVars = require('gulp-sass-vars');
const rename = require("gulp-rename");
const highlight = require('gulp-highlight-code');
const commandLineArgs = require('command-line-args');
var minimist = require('minimist');
var gulpif = require('gulp-if');
var map = require('map-stream');
var gulpSequence = require('gulp-sequence')
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var fs = require('fs')
var replace = require('gulp-replace');


function sass1() {

  
    const variables = {
        // variables to sass
    };
    sass_projects1();
    return src([
            'src/bundle/scss/style-rtl.scss',
            'src/bundle/scss/style-ltr.scss'

        ])

        .pipe(sassVars(variables, {
            verbose: true
        }))
        .pipe(sass({
            //    outputStyle: 'compressed'
        }))
        .pipe(autoprefixer('last 5 versions'))

        .pipe(dest('dist/css'));
    //   .pipe(browsersync.stream());

}


function serve() {
    browsersync.init({
        server: 'dist'
    });
    watch(['src/**/*.scss'], sass1);
    watch('src/**/*.html', indexFolder1);

}

function cdc(){
    console.log("done");
}


exports.newproject = series(copyProject, textProject);
exports.sass1 = sass1;

exports.serve = serve;
exports.indexFolder1 = indexFolder1;
exports.sass_projects1 = sass_projects1;
exports.default = series(indexFolder1, sass1, sass_projects1, serve);