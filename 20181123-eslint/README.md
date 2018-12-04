地址：

* http://eslint.cn/docs/user-guide/configuring
* https://eslint.org/docs/rules/

npm install eslint --save-dev

./node_modules/.bin/eslint --init


# 配置
* `.eslintrc.*`文件
* `package.json`文件里面`eslintConfig`字段
* 可以在命令行运行时指定一个任意的配置文件。
* 如果同一个目录下有多个配置文件，ESLint 只会使用一个。优先级顺序如下：
    1. .eslintrc.js
    2. .eslintrc.yaml
    3. .eslintrc.yml
    4. .eslintrc.json
    5. .eslintrc
    6. package.json
* 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录
    * 为了将 ESLint 限制到一个特定的项目，请设置设置 `"root": true`，一旦发现配置文件中有`"root": true`它就会停止在父级目录中寻找
* 规则ID：
    * "off" or 0 - 关闭规则
    * "warn" or 1 - 将规则视为一个警告（不会影响退出码）
    * "error" or 2 - 将规则视为一个错误 (退出码为1)
* `globals`设置全局变量，`true`（可以被重写）,`false`（只读）
    * 想在一个源文件里使用全局变量，推荐你在 ESLint 中定义这些全局变量，这样 ESLint 就不会发出警告了。你可以使用注释或在配置文件中定义全局变量。
* `plugins`来配置插件
    * 在使用插件之前，你必须使用 npm 安装它，比如`react`之类的
* `rules`来定义规则，数组的第一项总是规则的严重程度（数字或字符串）
    * 配置定义在插件中的规则，要用`"插件名/规则":规则ID`的形式：`"react/no-console": "error"`
* 可以在代码中用块注释添加和取消规则，行注释或块注释在某一特定的行上禁用所有规则
```javascript
    // 添加全局变量
    /* global var1:false, var2:false */
```
```javascript
    // 取消规则
    /* eslint-disable */
    alert(foo);
    /* eslint-enable */
```
```javascript
    alert('foo'); // eslint-disable-line
    alert('foo'); /* eslint-disable-line */

    // eslint-disable-next-line
    alert('foo');

    /* eslint-disable-next-line */
    alert('foo');
```
* 添加`settings`对象到配置文件，它将提供给每一个将被执行的规则，共享设置
```javascript
    "settings": {
        "sharedData": "Hello"
    }
```
* rules 属性可以做下面的任何事情以扩展（或覆盖）规则：
    * 改变继承的规则级别而不改变它的选项：
        * 基础配置：`"eqeqeq": ["error", "allow-null"]`
        * 派生的配置：`"eqeqeq": "warn"`
        * 最后生成的配置：`"eqeqeq": ["warn", "allow-null"]`
    * 覆盖基础配置中的规则的选项
        * 基础配置：`"quotes": ["error", "single", "avoid-escape"]`
        * 派生的配置：`"quotes": ["error", "single"]`
        * 最后生成的配置：`"quotes": ["error", "single"]`
* 告诉 ESLint 哪个文件扩展名要检测的唯一方法是使用 --ext 命令行选项指定一个逗号分隔的扩展名列表
    * 使用`.eslintignore`文件，也可以使用你的 `.gitignore`文件
        * `eslint --ignore-path .jshintignore file.js`
        * `eslint --ignore-path .gitignore file.js`
    * 指定`--ignore-path`意味着任何现有的`.eslintignore`文件将不被使用
    * 请注意`.eslintignore`中的匹配规则比`.gitignore`中的更严格
* 如果没有发现`.eslintignore`文件，也没有指定替代文件，ESLint 将在 package.json文件中查找`eslintIgnore`字段
    * `"eslintIgnore": ["hello.js", "world.js"]`

# 命令行工具

* `eslint -h` 查看所有选项
* `--no-eslintrc` 禁用 .eslintrc.* 和 package.json 文件中的配置
    * `eslint --no-eslintrc file.js`
* `-c, --config` 该选项允许你为 ESLint指定一个额外的配置文件
    * `eslint -c ~/my-eslint.json file.js`，使用了`~/my-eslint.json`作为配置文件。
    * 此配置文件中的选项优先于`.eslintrc.*`和`package.json`文件中的选项
