// 实现一个深度优先搜索算法（非递归）
	
function dfs(tree, name){
	// 请在这里实现
	if (!tree || !name) return;

	let stack = [tree]; // 模拟栈，存放待处理节点

	let curNode; // 当前节点
	let _children; // 当前节点的children

	while (stack.length) {
		curNode = stack.shift();
		
		if (curNode.name === name) return curNode; // 判断是否为要查找的节点

		_children = curNode.children;
		if (_children && _children.length) stack = [..._children, ...stack];
	}
	console.log('未找到');
}

var tree = {
	name : '中国',
	children : [
		{
			name : '北京',
			children : [
				{
					name : '朝阳群众'
				},
				{
					name : '海淀区'
				},
                {
					name : '昌平区'
				}
			]
		},
		{
			name : '浙江省',
			children : [
				{
					name : '杭州市',
					code : 0571,
				},
				{
					name : '嘉兴市',
				},
				{
					name : '绍兴市'
				},
				{
					name : '宁波市'
				}
			]
		}
	]
};

var node = dfs(tree, '杭州市');
console.log(node);    // { name: '杭州市', code: 0571 }