
import React, { Component } from "react";
import immutable, { Map, List, fromJS, toJS} from "immutable"
import "./index.scss";

import { Button } from 'antd';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
  }

  componentWillMount() {
    console.log('immutable', immutable)
    var map1 = Map({ a: 1, b: 2, c: 3 });
    var map2 = map1.set('b', 50);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    console.log('不会修改原来的对象的', map1.get('b') + " vs. " + map2.get('b'))
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    var list1 = List([ 1, 2 ]);
    var list2 = list1.push(3, 4, 5);
    console.log('list1,list2', list1, list2)
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    var alpha = map1.map((v, k) => {
      console.log(v, k)
      return k.toUpperCase();
    }).join();
    console.log('map1.map:', alpha)
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    var map1 = Map({ a: 1, b: 2, c: 3, d: 4 });
    var map2 = Map({ c: 10, a: 20, t: 30 });
    var obj = { d: 100, o: 200, g: 300 };
    var map3 = map1.merge(map2, obj);
    console.log('Map 和 普通对象合并map3:', map3);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    var list1 = List([ 1, 2, 3 ]);
    var list2 = List([ 4, 5, 6 ]);
    var array = [ 7, 8, 9 ];
    var list3 = list1.concat(list2, array);
    console.log('List 和 普通数组合并map3:', list3);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    var obj = { 1: "one" };
    console.log(Object.keys(obj)); // [ "1" ] 原来忽视了哦
    console.log(obj["1"], obj[1]); // "one", "one"
    var map = fromJS(obj);
    console.log('因为key都为字符串', map.get("1"), map.get(1)); // "one", undefined
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    var deep = Map({ a: 1, b: 2, c: List([ 3, 4, 5 ]) });
    console.log('toObject:', deep.toObject()); // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
    console.log('toArray:', deep.toArray()); // [ 1, 2, List [ 3, 4, 5 ] ]
    console.log('toJS:', deep.toJS()); // { a: 1, b: 2, c: [ 3, 4, 5 ] }
    console.log('JSON.stringify(map):', JSON.stringify(deep)); // '{"a":1,"b":2,"c":[3,4,5]}'
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    var obj = {a: {b: 2}}
    var map = fromJS(obj)
    console.log('map.get', map.get('a')) // {a:1} 得到1
    console.log('map.getIn', map.getIn(['a', 'b'])) // {a:{b:2}} 得到2。访问深层次的key
    console.log('map.setIn',map.setIn(['a', 'b'], 3).toJS()) // toJS 这样用
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    var map2 = map.update('a', function(x){return x.merge({c: 3})});
    console.log('map.update', map.toJS(), map2.toJS())
    var map3 = map.updateIn(['a', 'b'], function(x){return x+1});
    console.log('map.updateIn', map3.toJS())
    
  }

  render() {
    return (
      <div className="home">
        <h1>hello!</h1>
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default Home;
