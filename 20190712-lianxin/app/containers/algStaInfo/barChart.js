/*
 * @Description:
  */
 import React, { Component } from 'react'
 import echarts from 'echarts'
 import './index.scss'
 import intl from 'react-intl-universal';
 /**
  * Creates an instance of ComponentExample.
  * @param {any} props
  * @memberof ComponentExample
  */

 export default class ComponentExample extends Component {
   constructor(props) {
     super(props)
     let colors = ['#5793f3', '#d14a61', '#675bba']
     // 默认配置项
     this.options = {
           color: ['#003366', '#006699', '#4cabce', '#e5323e'],
           grid:{
             left:93,
             right:92,
             top:57,
             bottom:83
           },
           legend: {
               data: [
                 intl.get('alg-detail-static-part1-total'),
                 intl.get('alg-detail-static-part1-succeed-time'),
                ],
               itemWidth:12,
               itemHeight:12,
               top:40,
               right:92,
               itemGap:20,
               data:[
              {
                 name:intl.get('alg-detail-static-part1-total'),
                 icon:"circle",
                 textStyle:{
                   color:"#DBE2EA",
                   fontFamily:"PingFangSC-Regular",
                   fontSize:12
                 }
               },
                 {
                 name:intl.get('alg-detail-static-part1-succeed-time'),
                 icon:"circle",
                 textStyle:{
                   color:"#DBE2EA",
                   fontFamily:"PingFangSC-Regular",
                   fontSize:12
                 }
               }
             ]
           },
            title : {
                 text: intl.get('alg-detail-static-part1-des'),
                 x: 'center',
                 align: 'right',
                 top:257,
                 textStyle:{
                   color:"#DBE2EA",
                   fontFamily:"PingFangSC-Regular",
                   fontSize:14
                 }
             },
           calculable: true,
           xAxis: [
               {
                   type: 'category',
                   axisTick: {show: false},
                   data: ['v1.1.0', 'v2.2.1', 'v2.2.1', 'v2.2.1', 'v2.2.1'],
                   axisLine:{
                     show:true,
                     lineStyle:{
                       color:"#515775"
                     }
                   },
                   axisLabel:{
                     fontSize:12,
                     color:"rgba(219,226,234,1)",
                     fontFamily: 'PingFangSC-Regular',
                     lineHeight:17,
                     padding:[6,0,0,0]
                   },
               }
           ],
           yAxis: [
               {
                   axisLine:{
                     show:true,
                     lineStyle:{
                       color:"#515775"
                     }
                   },
                   axisLabel:{
                     show:false
                   },
                   splitLine:{
                     show:false
                   },
                   axisTick:{
                     show:false
                   }
               }
           ],
           series: [
               {
                   name: intl.get('alg-detail-static-part1-total'),
                   type: 'bar',
                   barGap: 0,
                   data: [320, 332, 301, 334, 390],
                   barWidth:10,
                   itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#26CEFF'},
                                    {offset: 1, color: '#0D56BB'}
                                ]
                            )
                        }
                  },
               },
               {
                   name: intl.get('alg-detail-static-part1-succeed-time'),
                   type: 'bar',
                   data: [220, 182, 191, 234, 290],
                   barWidth:10,
                   itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                  {offset: 0, color: '#FCB2A3'},
                                  {offset: 1, color: '#7455B7'}
                                ]
                            )
                        }
                  },
               }
           ]
       }
     this.instance = null
   }

   // 绑定事件
   /**
    * click
    * mouseenter
    * mousemove
    * mouseout
    */
   // bindEvent = () => {
   //
   // }

   // 绑定数据
   update = ({ options }) => {
     this.instance.setOption(options)
   }

   componentDidMount = () => {
     this.instance = echarts.init(this.refs.chartsContainer)
     this.instance.setOption(this.options)
   }

   componentWillReceiveProps = (nextProps) => {
    //  if (nextProps.options) {
    //   this.update(nextProps)
    //  }
   }

   render() {
     return (
         <div style={{width: 825, height: 300}} ref='chartsContainer'></div>
     )
   }
 }
