const WrapComponentExtendsCurrent = WrapedComponent => class extends WrapedComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data + '--FromCurrent'
        }
        console.log('WrapComponentExtendsCurrent--constructor', props);
    }

    componentDidMount() {
        console.log('WrapComponentExtendsCurrent--componentDidMount');
    }

    render() {
        console.log('WrapComponentExtendsCurrent--render');
        // 从父级组件里拿到render
        return super.render();
    }
}

export default WrapComponentExtendsCurrent;
