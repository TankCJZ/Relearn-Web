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
        // 设置项目根目录
        this.destinationRoot(this.answers.name);
        // 复制 vue 模板到项目
        this.copyTemplateAsync('vue', this.destinationPath());
    }
    install() {
        // 执行安装依赖 yarn install
        this.spawnCommand('yarn', ['install']);
    }
}