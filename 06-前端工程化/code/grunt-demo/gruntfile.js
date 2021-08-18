module.exports = grunt => {
    grunt.registerTask('test', () => {
        console.log('注册一个任务');
    })

    grunt.registerTask('task2', '任务描述', () => {
        console.log('task2')
    })

    // 标记失败任务
    grunt.registerTask('fail', '失败任务', () => {
        console.log('标记失败任务');
        return false;
    })

    // 异步任务

    grunt.registerTask('async-task', '测试异步任务', function() {
        // 获取 done 函数
        const done = this.async();
        // 异步任务不能使用箭头函数
        setTimeout(() => {
            console.log('异步任务执行完成');
            // 执行 done 函数
            done();
        }, 3000)
    })

    // 默认任务 执行test任务
    grunt.registerTask('default', ['task2', 'fail', 'test']);
}