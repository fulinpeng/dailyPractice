function Router() {
    this.router = {};
    console.log('router', this.router);
    let _this = this;
    window.onload = function () {
        _this.resolve();
    }
    // js调用history的api谷歌浏览器不会触发onpopstate事件
    window.onpopstate = function (e) {
        console.log('E', e);
        _this.resolve();
    }
}

Router.prototype.route = function (path, callback) {
    // console.log('path', path);
    if (!this.router[path]) {
        this.router[path] = callback;
    }
}
Router.prototype.resolve = function () {
    let hash = history.state.path;
    console.log('hash', hash);
    if (hash && this.router[hash] && typeof this.router[hash] == 'function') {
        this.router[hash]();
    }
}
