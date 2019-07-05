const mount = (wrap, component) => {
    wrap.appendChild(component._renderDom());
    component.onStateChange = (oldEl, newEl) => {
        wrap.insertBefore(newEl, oldEl);
        wrap.removeChild(oldEl);
    }
}
const createDOMFromString = (strDom) => {
    const div = document.createElement('div');
    div.innerHTML = strDom;
    return div;
};
class Component {
    constructor(props) {
        this.props = props;
    }
    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        }
        let oldEl = this.el;
        let newEl = this._renderDom(this.render());
        if (this.onStateChange) this.onStateChange(oldEl, newEl);
    }
    _renderDom() {
        this.el = createDOMFromString(this.render());
        if (this.onClick) this.el.addEventListener('click', this.onClick.bind(this), false);
        return this.el;
    }
}