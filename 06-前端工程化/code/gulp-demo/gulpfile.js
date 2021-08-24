// 定义一个任务
// done 时用来处理是否完成任务的函数
exports.test = done => {
    console.log('test task');
    done();
}

// 默认任务
exports.default = done => {
    console.log('default task');
    done();
}

const gulp = require('gulp');
gulp.task('task1', done => {
    console.log('register a task1');
    done();
})
// gulp.task('default', done => {
//     console.log('default task');
//     done();
// })

// 组合任务

// 串行执行任务

const { series, parallel, } = require('gulp');

// const task1 = done => {
//     console.log('task 1');
//     done();
// }
// const task2 = done => {
//     setTimeout(() => {
//         console.log('task 2');
//         done();
//     }, 1000)
// }
// const task3 = done => {
//     setTimeout(() => {
//         console.log('task 3');
//         done();
//     }, 500)
// }
// exports.foo = series(task1, task2, task3);

// 并行任务
// const task1 = async done => {
//     console.log('task 1');
//     done();
// }
// const task2 = async done => {
//     console.log('task 2');
//     done();
// }
// const task3 = async done => {
//     console.log('task 3');
//     done();
// }
// exports.foo = parallel(task1, task2, task3);

// 异步任务

exports.doneTask = done => {
    done(); //调用 done 表示任务结束
}

// Promise 
exports.promiseTask = () => {
    console.log('promise task');
    return Promise.resolve();
}

// reject
exports.rejectTask = () => {
    console.log('reject task');
    return Promise.reject(new Error('err'));
}

const taskAync = async () => {
    return 'async';
}
// async
exports.asyncTask = async () => {
    await taskAync();
    console.log('async task');
}

const fs = require('fs');
const { Transform } = require('stream');

exports.cssMini = done => {
    const from = fs.createReadStream('./normalize.css');
    const to = fs.createWriteStream('./normalize.min.css');

    const transfrom = new Transform({
        transform: (chunk, encoding, callback) => {
            // 转换成string            
            const str = chunk.toString();
            // 清空空格 和 注释内容
            const out = str.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
            callback(null, out);
        }
    })

    const end = from.pipe(transfrom).pipe(to);

    return end;
}

// 文件操作API
const { src, dest } = require('gulp');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');

exports.default = () => {
    return src('./normalize.css')
        .pipe(cleanCss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('dist'));
}