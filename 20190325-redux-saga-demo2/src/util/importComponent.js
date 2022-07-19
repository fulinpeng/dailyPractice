import React, { Component } from 'react';

const ImportComponent = (loader) => {
    console.log('@@@@@@@@@-loader', loader);
    return class extends Component {
        constructor() {
            super();
            this.state = {
                component: null
            }
        }
        componentDidMount() {
            // 前面用什么加载方式，这里就用对应的处理方式拿取组件

            // 如果是 import from 或者 require(...) 加载的就要在 module.default 里面取
            // loader((mod) => {
            //     console.log('@@@@@@@@@-mod', mod);
            //     this.setState({
            //         component: mod.default,
            //     });
            // });
            
            // 如果是 import(...) 加载的，它返回的是promise要调用 then 方法去取
            loader.then((importRes) => {
                console.log('@@@@@@@@@-mod', importRes);
                let realLoader = importRes.default; // 应该是经过 bunde loader 返回的那个loader
                realLoader((mod)=>{
                    this.setState({
                        component: mod.default, // 这就和上面那种情况一样了
                    });
                });
            })
            .catch((err)=>console.log(err));
        }
        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null; // 这里的props是在组建被使用的地方传进来的，如：<Main color="red"/>
        }
    }
};

export default ImportComponent;
