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
            },
            {
                type: 'input',
                name: 'content',
                message: '请输入项目内容',
                default: '',
            }
        ]).then(answers => {
            // 保存用户输入的值
            this.answers = answers;
        })
    }
    // 父类的方法
    writing() {
        // 调用父类的fs对象中方法
        // this.fs.write(this.destinationPath('test.json'), 'writing');

        // 使用模板文件
        const tmpl = this.templatePath('test.txt');
        // 输出目标文件
        const outfile = this.destinationPath(`${this.answers.name}.txt`);

        // 模板上下文 用于替换模板中的内容
        // const context = {
        //     title: 'simple脚手架',
        //     content: '支持ejs模板语法'
        // };
        
        // 通过模板文件输出文件
        this.fs.copyTpl(tmpl, outfile, this.answers);
    }
}