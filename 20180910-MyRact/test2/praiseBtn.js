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
    render() {
        this.el =  createDOMFromString(`<button class="praise_btn">
            <span class="praise_text">点赞</span>
        </button>`);
        this.el.addEventListener('click', () => {
            // console.log('点击');
            const praiseText = this.el.querySelector('.praise_text');
            this.state.isPraise = !this.state.isPraise;
            praiseText.innerHTML = this.state.isPraise ? '取消' : '点赞';
        }, false);
        return this.el;
    }
}