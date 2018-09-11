const mount = (wrap, component) => {
    wrap.appendChild(component._renderDom());
    component.onStateChange = (oldEl, newEl) => {
        wrap.insertBefore(newEl, oldEl);
        wrap.removeChild(oldEl);
    }
}
class PraiseBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPraise: false,
        }
    }
    onClick() {
        this.setState({
            isPraise: !this.state.isPraise
        });
    }
    render() {
        return `<button class="praise_btn" style="color:${this.props.color}">
            <span class="praise_text">${this.state.isPraise ? '取消' : '点赞'}</span>
        </button>`
    }
}