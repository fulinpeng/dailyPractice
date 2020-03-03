import {PropTypes} from 'prop-types'

const connect=(mapStateToProps, mapDispatchToProps) => (WrappedComponent => {
    class Connect extends Component {
        constructor() {
            super()
            this.state={}
        }

        componentWillMount() {
            this.unSubscribe=this.context.store.subscribe(() => {
                this.setState(mapStateToProps(this.context.store.getState()))
            })
        }

        componentWillUnmount() {
            this.unSubscribe()
        }

        render() {
            return <WrappedComponent  {...this.state}
                {...mapDispatchToProps(this.context.store.dispatch)} />
        }
    }

    Connect.contextTypes={
        store: PropTypes.object
    }
    return Connect
})

export default connect