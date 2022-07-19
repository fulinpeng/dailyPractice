function Router() {
    this.router = {};
    let _this = this;
    window.onload = function () {
        _this.resolve();
    }
    window.onhashchange = function () {
        _this.resolve();
    }
    console.log(this.router);
}

Router.prototype.route = function (path, callback) {
    console.log('path', path);
    if (!this.router[path]) {
        this.router[path] = callback;
    }
}
Router.prototype.resolve = function () {
    let hash = location.hash.slice(1);
    console.log('hash', hash);
    if (this.router[hash] && typeof this.router[hash] == 'function') {
        this.router[hash]();
    }
}
