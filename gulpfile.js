/*jslint node:true */
(function () {

    'use strict';

    var gulp = require('gulp'),
        args = require('yargs').argv,
        config = require('./gulp.config')(),
        $ = require('gulp-load-plugins')({lazy: true});

    gulp.task('vet', function () {
        log('Analyzing source with JSHint and JSCS');
        
        gulp.src(config.alljs)
            .pipe($.if(args.verbose, $.print()))
            .pipe($.jscs())
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-stylish'), {verbose: true})
            .pipe($.jshint.reporter('fail'));

    });
    
    function log(msg) {
        var item;
        if (typeof (msg) === 'object') {
            for (item in msg) {
                if (msg.hasOwnProperty(item)) {
                    $.util.log($.util.colors.blue(msg[item]));
                }
            }
        } else {
            $.util.log($.util.colors.blue(msg));
        }
                    
    }

}());