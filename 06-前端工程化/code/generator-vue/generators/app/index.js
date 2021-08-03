const Generator = require('yeoman-generator');

// 需要继承 基类 Generator 并且导出
module.exports = class extends Generator {
    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: '请输入项目名称',
                default: this.appname, //默认值使用项目目录名
            }
        ]).then(answers => {
            // 保存用户输入的值
            this.answers = answers;
        })
    }
    // 父类的方法
    writing() {
        
    }
}