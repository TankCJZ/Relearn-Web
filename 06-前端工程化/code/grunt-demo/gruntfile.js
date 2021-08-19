const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks');
module.exports = grunt => {
    // grunt.registerTask('test', () => {
    //     console.log('注册一个任务');
    // })

    // grunt.registerTask('task2', '任务描述', () => {
    //     console.log('task2')
    // })

    // // 标记失败任务
    // grunt.registerTask('fail', '失败任务', () => {
    //     console.log('标记失败任务');
    //     return false;
    // })

    // // 异步任务

    // grunt.registerTask('async-task', '测试异步任务', function() {
    //     // 获取 done 函数
    //     const done = this.async();
    //     // 异步任务不能使用箭头函数
    //     setTimeout(() => {
    //         console.log('异步任务执行完成');
    //         // 执行 done 函数
    //         done();
    //     }, 3000)
    // })

    // // 默认任务 执行test任务
    // grunt.registerTask('default', ['task2', 'fail', 'test']);

    // 配置
    // grunt.initConfig({
    //     name: 'task'
    // })

    // grunt.registerTask('task', () => {
    //     // 获取 配置信息
    //     console.log(grunt.config('name'))
    // })

    // grunt.initConfig({
    //     name: {
    //         file: 'file'
    //     }
    // })

    // grunt.registerTask('task', () => {
    //     // 获取 配置信息
    //     console.log(grunt.config('name.file'))

    //     console.log(grunt.config('name')); //{ file: 'file' }
    // })

    // grunt.initConfig({
    //     // build 任务将会执行该配置
    //     build: {
    //         css: 'css task',
    //         js: 'js task'
    //     }
    // });

    // grunt.initConfig({
    //     // build 任务将会执行该配置
    //     build: {
    //         options: {
    //             key: 'value',
    //             conf: '配置1'
    //         },
    //         css: {
    //             options: {
    //                 cssKey: 'cssValue'
    //             }
    //         },
    //         js: 'js task' // 子任务
    //     }
    // });


    // // 注册多目标任务 build 同时需要配置 属性名为 build 的配置
    // grunt.registerMultiTask('build', function() {
    //     console.log('配置信息 options: ', this.options()); //{ key: 'value', conf: '配置1' }
    // })

    grunt.initConfig({
        // 配置插件任务的相关属性
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            // 转换index.css文件
            index: {
                // 配置文件，key 为目标路径 value 为源文件
                files: {
                    'dist/index.css': 'src/index.scss'
                }
            }
        },
        // 配置 babel 插件
        babel: {
            options: {
                // 配置需要转换的语法 这里使用 babel 提供的默认预设
                presets: ['@babel/preset-env']
            },
            index: {
                // 配置文件，key 为目标路径 value 为源文件
                files: {
                    'dist/index.js': 'src/index.js'
                }
            }
        },
        watch: {
            // 监听 js 文件变化
            js: {
                // 监听文件的目录
                files: ['src/*.js'],
                tasks: ['babel'], //文件变化执行的任务
            },
            css: {
                files: ['src/*.scss'],
                tasks: ['sass'], //文件变化执行的任务
            }
        }
    });

    // 加载 grunt-sass 插件
    // grunt.loadNpmTasks('grunt-sass');
    loadGruntTasks(grunt);

    // 注册一个默认任务，先执行一遍 sass babel 在执行监听
    grunt.registerTask('default', ['sass', 'babel', 'watch'])
}