import * as React from 'react';

import AddTodo from './container/addTodo';
import VisibleTodoList from './container/visibleTodoList';
import Footer from './components/footer';

// import logo from './../logo.svg';
import './App.css';

import { Observable } from 'rxjs/Rx'

class App extends React.Component {

    componentDidMount() {
        // Hello world!
        Observable.of('Hello world!')
            .map(w => w + ' Hello rx~') // Annotated properly: (w: string) => string
            .subscribe(console.log.bind(console)) // 'Hello world! Hello rx~'

        // Observable.fromEvent
        let $input: HTMLInputElement;
        // 😂为嘛必须这样呀，不是应该 <HTMLInputElement> 这样吗
        // tsx中<被占用，所以采用as操作符
        $input = document.querySelector('.test-input') as HTMLInputElement;

        // 按键就会打印
        // Observable.fromEvent<KeyboardEvent>($input, 'keydown')
        //     .do(r => console.log(r))
        //     .subscribe()

        // 只有按回车才会打印
        Observable.fromEvent<KeyboardEvent>($input, 'keydown')
            .filter(r => r.keyCode === 13)
            // .filter(r => r.value !== '') // 果然没有value属性😂
            .do(r => console.log(r))
            .subscribe()

        // 使用 map 进行数据的变换
        // 那怎么处理上一个Observable的值呢😂
        const arr = [
            { name: 'flp1', age: 21 },
            { name: 'flp2', age: 22 },
            { name: 'flp3', age: 23 },
        ]
        Observable.of(arr)
            .map(v => v.map(i => {
                return {
                    ...i,
                    extra: 'dadada~',
                };
            }))
            .do(r => console.log(r))
            .subscribe()

        // 在 RxJS 的范式中，数据流动中的 副作用 都应该写在 do 操作符中。

        let enterEvent = Observable.fromEvent<KeyboardEvent>($input, 'keydown')
        enterEvent
            .filter((e: KeyboardEvent) => e.keyCode === 65) //过滤只允许按A键事件通过；
            .map(() => $input.value) //获取当前输入区的值，映射为新的事件发射；
            .filter(v => v.length > 0)  //过滤只允许输入长度>0零的值通过；
            .map(v => { return { title: v } })  //根据输入值生成一个新的todo对象，映射为新的事件发射；
            // 这两个参数值一个是上次调用时的值，一个是这次的值
            .scan((todos, todo) => {
                if (todos) {
                    return [...todos, todo]
                } else {
                    todos = [todo]
                }
                return todos;
            }, []) //todos是上一次scan调用产生的结果，todo是这次调用的新值，将二者合并到一个新的数组对象。
            .do(r => console.log('@@@@@@@@@@@@@', r))
            .subscribe((c) => {
                // this.setState({ data: c }); //更新App组件的state值
                setTimeout(() => {
                    $input.value = ''    //清空输入区内容，等待新的输入
                }, 100)
            })//todos作为值传入订阅函数（只有一个函数时这个是onNext）。
            // 上面这段话按A来测试的哈

            // let foo = Observable.create(observer => {
            //     try {
            //         console.log('Hello');
            //         observer.next(42);
            //         observer.complete();
            //         observer.next(10);
            //     } catch(e) { observer.error(e) }
            // });
              
            // let observer = {
            //     next(value) { console.log(value) },
            //     complete() { console.log('completed'),
            //     error(err) { console.error(err) }
            // };
            // foo.subscribe(observer);

    }
    render() {
        return (
            <div className="App">
                <AddTodo />
                <VisibleTodoList />
                <Footer />
            </div>
        );
    }
}

export default App;
