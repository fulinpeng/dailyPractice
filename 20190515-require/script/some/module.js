define(['my/module'], function (my) {
        console.log('加载模块some...');
        console.log('some依赖my：', my);
        let name = '名字：' + my.name;
        function getName(){
            return name;
        }
        return {
            getName
        }
    }
);
