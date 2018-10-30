const gulp = require('gulp'), //value will not change , var ==> value change
    sass = require('gulp-sass'),
    sass_component_rtl = require('gulp-sass'),
    sass_component_ltr = require('gulp-sass'),
    sass_cdn_path = require('gulp-sass'),
    sass_cdn_project = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    autoprefixer = require('gulp-autoprefixer'),
    browsersync = require('browser-sync').create();
componentsFolder = require('gulp-file-include'),
    indexFolder = require('gulp-file-include'),
    sassVars = require('gulp-sass-vars'),
    rename = require("gulp-rename")

     

/*
    gulp.task => task name 
    gulp.src => point to files that will use
    pipe => what will hapened with source files 
    gulp.dest => point to outout folder 
    gulp.watch => watch files for change 


    gulp.task('TASK_NAME' , function(){
        gulp.src('PATH/TO/SOUCE/FILE')
        .pipe(varname())
        .pipe(gulp.dest('PATH/TO/OUTPUT/FILE'))

    });
*/
var designSystemVersion ='1.6';
var cdnVersion ='1.4'; // CDN version Please verify that you are using the right version

// gulp sass 

gulp.task('sass', function () {
    
    const variables = {
        cdnPath:false,
        designSystemVersionSass : designSystemVersion
        };
        gulp.start('sass_cdn_path');
        gulp.start('sass_cdn_project');
   return gulp.src([
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

        .pipe(gulp.dest('dist/css/designsystem/'+designSystemVersion))

        .pipe(browsersync.stream());
       
      
});


gulp.task('sass_cdn_path', function () {
   
    const variables = {
        cdnPath:true,
        designSystemVersionSass : designSystemVersion
        };
    return gulp.src([
            'src/bundle/scss/style-rtl.scss',
            'src/bundle/scss/style-ltr.scss'
        ])
        .pipe(sassVars(variables, {
            verbose: true
        }))
        .pipe(sass_cdn_path({
            //    outputStyle: 'compressed'
        }))
        .pipe(autoprefixer('last 5 versions'))

        .pipe(gulp.dest('../meras-cdn/libs/designsystem/'+designSystemVersion))
        .pipe(browsersync.stream());
});


gulp.task('sass_cdn_project', function () {
   
    const variables = {
        cdnPath:true,
        designSystemVersionSass : designSystemVersion
        };
    return gulp.src([
            'src/projects/cdn/scss/meras-rtl.scss',
            'src/projects/cdn/scss/meras-ltr.scss'
        ])
        .pipe(sassVars(variables, {
            verbose: true
        }))
        .pipe(sass_cdn_project({
            //    outputStyle: 'compressed'
        }))
        .pipe(autoprefixer('last 5 versions'))

        .pipe(gulp.dest('../meras-cdn/apps/meras/'+cdnVersion+'/css')) 
        .pipe(browsersync.stream());
});


gulp.task('sass_component_rtl', function () {
    const variables = {
        right: "right",
        left: "left"
    };
    return gulp.src([
            'src/components/**/*.scss'
        ])
        .pipe(sassVars(variables, {
            verbose: true
        }))
        .pipe(sass_component_rtl({
            //    outputStyle: 'compressed'
        }))
        .pipe(autoprefixer('last 2 versions'))

        .pipe(rename(function (path) {
            path.basename += "-rtl";
        }))
        .pipe(gulp.dest('dist/components'))
        .pipe(browsersync.stream())
});

gulp.task('sass_component_ltr', function () {
    const variables = {
        right: "left",
        left: "right"
    };
    return gulp.src([
            'src/components/**/*.scss'
        ])
        .pipe(sassVars(variables, {
            verbose: true
        }))
        .pipe(sass_component_ltr({
            //    outputStyle: 'compressed'
        }))
        .pipe(autoprefixer('last 2 versions'))

        .pipe(rename(function (path) {
            path.basename += "-ltr";
        }))

        .pipe(gulp.dest('dist/components'))
        .pipe(browsersync.stream())
});

// import html 
gulp.task('componentsFolder', function () {
    gulp.src(['src/components/**/*.html'])
        .pipe(componentsFolder({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/components'))
        .pipe(browsersync.stream());

    gulp.start('indexFolder');

});

gulp.task('indexFolder', function () {
    gulp.src(['src/*.html'])
        .pipe(indexFolder({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browsersync.stream());
});

// gulp browser sync
gulp.task('serve', function () {
    browsersync.init({
        server: 'dist'
    });
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.scss', ['sass_component_rtl']);
    gulp.watch('src/**/*.scss', ['sass_component_ltr']);
    //    gulp.watch(['src/js/app.js'], ['js']);
    gulp.watch('src/**/**/***.html', ['componentsFolder']);
    gulp.watch('src/*.html', ['indexFolder']);
    gulp.watch("*.html").on("change", browsersync.reload);
});

// gulp 
gulp.task('default', ['sass', 'sass_component_rtl', 'sass_component_ltr', 'componentsFolder', 'indexFolder', 'serve']);



// gulp js
/*
gulp.task('js', function () {
    gulp.src(['src/js/app.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'))
        .pipe(browsersync.stream())
});

// gulp igagemin
/*
gulp.task('images', function () {
    gulp.src('src/src-img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/images'))

});*/