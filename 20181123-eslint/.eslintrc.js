module.exports = {
    // "root": true,
    "env": { // 这些环境不是互斥的可以设置多个环境，在package.json中eslintConfig也是可以的
        "browser": true,
        "node": true,
        "es6": true // 自动启用 ES6 语法支持
    },
    "globals": {
        "var1": true,
        "var2": false
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": { // 额外的语言特性:
            "jsx": true,
            "impliedStrict":true,
            "globalReturn":true
        },
        "ecmaVersion": 2018, // 3、5、7、8、9 指定你想要使用的 ECMAScript 版本
        "sourceType": "module" // 代码是 ECMAScript 模块
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            4 // 设置缩进为一个4个space
        ],
        // "indent": [
        //     "error",
        //     "tab"
        // ], // 这是设置缩进为一个tab
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": 0,
        "react/no-console": 1, // 给react指定规则
        // "jquery/dollar-sign": 0,
        "no-dupe-args": 0,
        "no-empty": 2,
        "no-tabs":2,
        "dot-location": 2,
        "no-mixed-spaces-and-tabs":2,
        "no-var": 2
    }
};