# 多页应用

> 一个html模板代对应一个entry

> 自己写一个`htmlplugin`，它负责把内容插入到`views/index.html`中的`block`中，不然它自带的插件是将它插到最后

> 自定义一个`plugin`在官网上有，要按照它提供的写法

# 为什么要多页转单页？

* 单页的话，是浏览器先加载index-*.js，然后请求里面的依赖资源，文件比较大吧，会有一段时间白屏

* 多页的话，可以先直出首页，然后加载其它文件，体验更好

* 一般pc用多页，pc用单页没必要

# nest

* nest 相当于nodejs的spring

# 安装

* npm install -g @nestjs/cli
* nest new project
* cd project
* npm install
* npm start


* 模板里面才是真正的组件

```html
{% block cotent %}
    <h1>{{message}}</h1>
    {% include '../components/banner/banner.html' %}
{% endblock %}
```

# 结构
* project 后端
* webapp 前端


* 这样理解感觉有问题，暂时放下