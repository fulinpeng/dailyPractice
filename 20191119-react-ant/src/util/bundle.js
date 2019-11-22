import { Component } from "react";
export default class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mod: null
        };
    }

    componentWillMount() {
        this.load(this.props.loader())
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(loaderRes) {
        this.setState({
            mod: null
        });
        loaderRes.then((mod) => {
            this.setState({
                mod: mod.default ? mod.default : mod
            });
        })
        .catch((err) => console.log(err));
    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : null;
    }
}