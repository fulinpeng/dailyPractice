/*
 * @Description:
  */
import React, { Component } from 'react'
import echarts from 'echarts'
import { Button, Carousel, Breadcrumb, DatePicker } from 'antd'
import './index.scss'
import intl from 'react-intl-universal';
import CommonTable from '../../components/common/commonTable/index'

const { RangePicker } = DatePicker;

const lineData1 = {
  xAxisData: ['10-24 Mon', '10-24 Mon', '10-24 Mon', '10-24 Mon'],
  seriesValus: [9, 3, 2, 2]
}
const lineData2 = {
  xAxisData: ['10-24 Mon', '10-24 Mon', '10-24 Mon', '10-24 Mon', '10-24 Mon', '10-24 Mon', '10-24 Mon', '10-24 Mon'],
  seriesValus: [5, 9, 7, 8, 9, 3, 2, 2]
}
const lineData3 = {
  xAxisData: ['10-23 Sun', '10-24 Mon', '10-24 Mon', '10-24 Mon', '10-24 Mon', '10-24 Mon', '10-24 Mon', '10-24 Mon', '10-24 Mon', '10-24 Mon', '10-24 Mon'],
  seriesValus: [1, 3, 4, 5, 9, 7, 8, 9, 3, 2, 2]
}
let lineData = lineData1;

class Echarts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      barData: [
        { id: 989, time: '19/02/01 8:10:00', platform: 'LM-TPS', status: 'Queue' },
        { id: 989, time: '19/02/01 8:10:00', platform: 'LM-TPS', status: 'Queue' },
        { id: 989, time: '19/02/01 8:10:00', platform: 'LM-TPS', status: 'Queue' },
        { id: 989, time: '19/02/01 8:10:00', platform: 'LM-TPS', status: 'Queue' },
        { id: 989, time: '19/02/01 8:10:00', platform: 'LM-TPS', status: 'Queue' },
        { id: 989, time: '19/02/01 8:10:00', platform: 'LM-TPS', status: 'Queue' },
        { id: 989, time: '19/02/01 8:10:00', platform: 'LM-TPS', status: 'Queue' },
      ]
    };
    this.instance = null;
    this.columns = [
      {
        title: 'ID',
        key: '1',
        dataIndex: 'id',
        // width: "14%",
        render: (text) => text || '--'
      },
      {
        title: 'Time',
        key: '2',
        dataIndex: 'time',
        // width: "14%",
        render: (text) => text || '--'
      },
      {
        title: 'Platform',
        key: '3',
        dataIndex: 'platform',
        // width: "14%",
        render: (text) => text || '--'
      },
      {
        title: 'Status',
        key: '4',
        dataIndex: 'status',
        // width: "14%",
        render: (text) => text || '--'
      },
    ];
  }

  bindEvent = () => {

  }

  initCurvOption = () => {
    return {
      color: ['#003366', '#006699', '#4cabce', '#e5323e'],
      grid: {
        left: 55,
        right: 55,
        top: 90,
        bottom: 80
      },
      legend: {
        data: [
          intl.get('alg-detail-static-part1-total'),
          intl.get('alg-detail-static-part1-succeed-time'),
        ],
        itemWidth: 12,
        itemHeight: 12,
        top: 40,
        right: 92,
        itemGap: 20,
        data: [
          {
            name: intl.get('alg-detail-static-part1-total'),
            icon: "circle",
            textStyle: {
              color: "#DBE2EA",
              fontFamily: "PingFangSC-Regular",
              fontSize: 12
            }
          },
          {
            name: intl.get('alg-detail-static-part1-succeed-time'),
            icon: "circle",
            textStyle: {
              color: "#DBE2EA",
              fontFamily: "PingFangSC-Regular",
              fontSize: 12
            }
          }
        ]
      },
      title: {
        text: 'Algorithm Invoke Times In Last Week',
        x: 50,
        align: 'left',
        top: 30,
        textStyle: {
          color: "#BEBEBE",
          fontFamily: "PingFangSC-Regular",
          fontSize: 14,
          fontWeight: 'bold'
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: lineData.xAxisData,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#515775"
            }
          },
          axisLabel: {
            fontSize: 12,
            color: "rgba(219,226,234,1)",
            fontFamily: 'PingFangSC-Regular',
            lineHeight: 17,
            padding: [6, 0, 0, 0]
          },
        }
      ],
      yAxis: [
        {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#515775"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '模拟数据',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          hoverAnimation: true,
          sampling: 'average',
          itemStyle: {
            normal: {
              color: '#4C8BF5'
            }
          },
          stack: 'a',
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#4B8AF5'
              }, {
                offset: 1,
                color: '#4c8bf500'
              }])
            }
          },
          data: lineData.seriesValus
        }
      ]
    }
  }

  initBarOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      legend: {
        data: ['谷歌', '必应', '其他', '曲线1', '曲线2', '曲线3', ]
      },
      grid: [
        {
          top: '50',
          left: '5%',
          right: '5%',
          bottom: '10%',
          containLabel: false
        },
      ],
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#515775"
            }
          },
          axisLabel: {
            fontSize: 12,
            color: "rgba(219,226,234,1)",
            fontFamily: 'PingFangSC-Regular',
            lineHeight: 17,
            padding: [6, 0, 0, 0]
          },
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '水量',
          axisLine: {
            show: true,
            lineStyle: {
              color: "#515775"
            }
          },
          axisLabel: {
            formatter: '{value}'
          },
          lineStyle: {
            color: "#515775"
          },
          position: 'left',
          min: 0,
        },
        {
          type: 'value',
          name: '温度',
          axisLine: {
            show: true,
            lineStyle: {
              color: "#515775"
            }
          },
          axisLabel: {
            formatter: '{value}'
          },
          lineStyle: {
            color: "#515775"
          },

        }
      ],
      series: [
        {
          name: '曲线1',
          type: 'line',
          stack: '搜索引擎',
          data: [120, 132, 101, 134, 290, 230, 220],
          yAxisIndex: 1,
        },
        {
          name: '曲线2',
          type: 'line',
          stack: '搜索引擎',
          data: [60, 72, 71, 74, 190, 130, 110],
          yAxisIndex: 1,
        },
        {
          name: '曲线3',
          type: 'line',
          stack: '搜索引擎',
          data: [62, 82, 91, 84, 109, 110, 120],
          yAxisIndex: 1,
        },
        {
          name: '谷歌',
          type: 'bar',
          stack: '搜索引擎',
          data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
          name: '必应',
          type: 'bar',
          stack: '搜索引擎',
          data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
          name: '其他',
          type: 'bar',
          stack: '搜索引擎',
          data: [62, 82, 91, 84, 109, 110, 120]
        },
      ]
    };
  }

  componentDidMount = () => {
    this.setCurvOption();
    this.setBarOption();
  }

  setCurvOption = () => {
    let instance = echarts.init(this.refs.curvHartsContainer)
    instance.setOption(this.initCurvOption())
  }

  setBarOption = () => {
    let instance = echarts.init(this.refs.barHartsContainer)
    instance.setOption(this.initBarOption())
  }

  onChange = (date, dateString) => {
    lineData = lineData3;
    this.setCurvOption();
  }

  changeDateRange = (type) => {
    switch (type) {
      case 'day': lineData = lineData1;
        break;
      case 'week': lineData = lineData2;
        break;
      case 'mouth': lineData = lineData3;
        break;
    }
    this.setCurvOption();
  }

  render() {
    return (
      <div className="home_page">
        <Breadcrumb>
          <Breadcrumb.Item className="crumb"><span style={{ cursor: "pointer" }} onClick={this.reAlgMan} className="hover">{intl.get('nav-alg-man')}</span><span className="sub cur"><span className="icon">/</span>{intl.get('btn-vie')}</span></Breadcrumb.Item>
        </Breadcrumb>
        <div className="home_container">
          <div className="home_page_top">
            <div className="alg_invok_curve">
              <div className="curve_select_date">
                <div className="select_date_btns">
                  <div className="data_btn active" onClick={this.changeDateRange.bind(this, 'mouth')}>Mouth</div>
                  <div className="data_btn" onClick={this.changeDateRange.bind(this, 'week')}>Week</div>
                  <div className="data_btn" onClick={this.changeDateRange.bind(this, 'day')}>Day</div>
                </div>
                <div><RangePicker onChange={this.onChange} /></div>
              </div>
              <div className="curve" style={{ width: 900, height: 408 }} ref='curvHartsContainer'></div>
            </div>
            <div className="alg_invok_curve_pannel">
              <div className="info_item green">
                <div className="item_data">
                  <span className="data_num">342</span>
                  <span className="data_icon">10%</span>
                </div>
                <div className="item_des">
                  <span>Total Number of</span><br />
                  <span>This Week</span>
                </div>
              </div>
              <div className="info_item blue">
                <div className="item_data">
                  <span className="data_num">342</span>
                  <span className="data_icon">10%</span>
                </div>
                <div className="item_des">
                  <span>Total Number of</span><br />
                  <span>This Mouth</span>
                </div>
              </div>
              <div className="info_item">
                <div className="item_data">
                  <span className="data_num">342</span>
                  <span className="data_icon">10%</span>
                </div>
                <div className="item_des">
                  <span>Total Number</span>
                </div>
              </div>
            </div>
          </div>
          <div className="home_page_buttom">
            <div className="alg_invok_bar">
              <div className="invok_bar_head">
                <div className="invok_bar_tit">Task Statistical</div>
                <div className="invok_bar_btn">
                  <span>...</span>
                </div>
              </div>
              <div className="curve" style={{ width: 800, height: 358 }} ref='barHartsContainer'></div>
            </div>
            <div className="alg_invok_bar_table">
              <div className="table_tit">
                <span>Task Monitiring</span>
                <span className="view_all">View all</span>
              </div>
              <div className="table_content">
                <CommonTable
                  columns={this.columns}
                  dataSource={this.state.barData}
                  pagination={false}
                  // loading={this.state.loading}
                  rowKey={'id'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Echarts;