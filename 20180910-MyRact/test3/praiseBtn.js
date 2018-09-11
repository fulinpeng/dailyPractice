const createDOMFromString = (strDom)=> {
    const div = document.createElement('div');
    div.innerHTML = strDom;
    // console.log(div);
    return div;
};
class PraiseBtn {
    constructor() {
        this.state = {
            isPraise : false,
        }
    }
    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        }
        // 有了下面的三句代码，让页面根据state变化做出同步更新
        let oldEl = this.el;
        let newEl = this.render();
        if (this.onStateChange) this.onStateChange(oldEl, newEl);
    }
    praiseBtnHandler() {
        this.setState({
            isPraise : !this.state.isPraise
        });
    }
    render() {
        this.el =  createDOMFromString(`<button class="praise_btn">
            <span class="praise_text">${this.state.isPraise ? '取消' : '点赞'}</span>
        </button>`);
        this.el.addEventListener('click', this.praiseBtnHandler.bind(this), false);
        // console.log(this.el);
        return this.el;
    }
}