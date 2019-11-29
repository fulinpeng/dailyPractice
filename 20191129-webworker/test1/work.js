this.addEventListener('message', function (e) {
    this.postMessage(e.data);
}, false);