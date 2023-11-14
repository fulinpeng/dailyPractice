// 无向图
function Graph() {
    this.vertexes = [];
    this.edge = {};
    this.addEdge = function (a, b) {
        if (!this.vertexes.includes(a)) {
            this.vertexes.push(a);
        }
        if (!this.vertexes.includes(b)) {
            this.vertexes.push(b);
        }
        if (!this.edge[a]) {
            this.edge[a] = [];
        }
        this.edge[a].push(b);
        if (!this.edge[b]) {
            this.edge[b] = [];
        }
        this.edge[b].push(a);
    };
    this.BFS = function (node, cb) {
        let white = "white";
        let black = "black";
        let color = {}; // white 未访问，black 访问完毕
        // 初始化
        this.vertexes.forEach((v) => (color[v] = white));
        let queue = [node];
        while (queue.length) {
            let cur = queue.shift();
            if (color[cur] === black) continue;
            if (color[cur] === white) {
                cb(cur);
                color[cur] = black;
                queue.push(...this.edge[cur]);
            }
        }
    };
    this.DFS = function (ndoe, cb) {
        // let white = "white";
        let black = "black";
        let color = {}; // white 未访问，black 访问完毕
        // 初始化
        // this.vertexes.forEach((v) => (color[v] = white));
        let stak = [node];
        while (queue.length) {
            let cur = queue.pop();
            if (color[cur] === black) continue;
            if (!color[cur]) {
                c;
            }
        }
    };
}

var graph = new Graph();
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("C", "D");

console.log(graph);

graph.BFS("A", function (node) {
    console.log(node);
});
