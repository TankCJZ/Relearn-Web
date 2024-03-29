const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
// const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');

const style = () => {
    return src('src/css/*.scss', { base: 'src'})
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist'));
}

const script = () => {
    return src('src/js/*.js', { base: 'src' })
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(dest('dist'))
}

// const img = () => {
//     return src('src/img/*.png', { base: 'src' })
//         .pipe(imagemin())
//         .pipe(dest('dist'))
// }

// 组合任务
const compile = parallel(style, script);



const browserSync = require('browser-sync');
const { watch, } = require('gulp');
const bs = browserSync.create();

const serve = () => {
    watch('src/css/*.scss', style);
    watch('src/js/*.js', script);
    bs.init({
        server: {
            files: 'dist/**',
            baseDir: ['src', 'dist'],
        }
    })
}


module.exports = {
    compile,
    serve,
};