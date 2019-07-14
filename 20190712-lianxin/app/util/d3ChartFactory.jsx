
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFauxDOM } from 'react-faux-dom'

const D3ChartHOCFactory = (WrappedChart) => {
    class HOC extends Component {
        /**
         * @description propTypes验证
         * @static
         * @memberof Chart
         */
        static propTypes = {
            data: PropTypes.array.isRequired
        }

        /**
         * @description 默认props
         * @static
         * @memberof Chart
         */
        static defaultProps = {
            chart: 'loading...'
        }

        constructor (props) {
            super(props)
            // 创建一个虚拟DOM，并将该虚拟DOM存储到state.chart中
            let faux = this.props.connectFauxDOM('div', 'chart')
            
            // 实例化WrappedChart
            this.chartInstance = new WrappedChart(faux)
        }
        
        componentDidMount () {
            const { data, animateFauxDOM } = this.props
        
            // animateFauxDOM作为第二个参数传递给图表组件
            // 用于设置动画持续时间，实现绘制过程中的动画效果
            this.chartInstance.render(this.props.data, animateFauxDOM)
        }

        /**
         * @description 数据更新后重新渲染图表
         * @param {any} prevProps 新的props
         * @param {any} prevState 新的state
         * @memberof Chart
         */
        componentDidUpdate (prevProps, prevState) {
            if (this.props.data !== prevProps.data) {
            this.chartInstance.render(this.props.data, this.props.animateFauxDOM)
            }
        }
        render () {
            return (
                <div className='d3-chart-factory'>
                    {this.props.chart}
                </div>
            )
        }
    }
    return withFauxDOM(HOC)
}

export default D3ChartHOCFactory
