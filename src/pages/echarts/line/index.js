import React from 'react';
import {Card} from 'antd';
import echartTheme from './../echartTheme';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Line extends React.Component {

	componentWillMount() {
		echarts.registerTheme('test', echartTheme)
	}

	getOption = () => {
		let option = {
			title:{
				text:'用户骑行数据',
			},
			tooltip:{
				trigger:'axis',
			},
			yAxis:{
				type:'value'
			},
			xAxis:{
				data:['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			series:[
				{
					name: '订单量',
					type: 'line',
					data:[
						1000, 2000, 1500, 3000, 2000, 1200, 800
					]
				}
			]
		}


		return option;
	}

	getOption2 = () => {
		let option = {
			title:{
				text:'用户骑行数据',
			},
			tooltip:{
				trigger:'axis',
			},
			yAxis:{
				type:'value'
			},
			xAxis:{
				data:['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			legend:{
				data:['OFO订单量','摩拜订单量']
			},
			series:[
				{
					name: 'OFO订单量',
					type: 'line',
					data:[
						1000, 2000, 5500, 6000, 8000, 10000, 12000
					]
				},
				{
					name: '摩拜订单量',
					type: 'line',
					data:[
						1200, 3000, 4500, 6000, 8000, 12000, 20000
					]
				}
			]
		}

		return option;
	}

	getOption3 = () => {
		let option = {
			title:{
				text:'用户骑行数据',
			},
			tooltip:{
				trigger:'axis',
			},
			yAxis:{
				type:'value'
			},
			xAxis:{
				// type: 'category',
				boundaryGap: false,
				data:['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			series:[
				{
					name: '订单量',
					type: 'line',
					data:[
						1000, 2000, 1500, 3000, 2000, 1200, 800
					],
					areaStyle:{}
				}
			]
		}

		return option;
	}

	render() {
		return (
			<div>
				<Card title="折线图表之一">
					<ReactEcharts option={this.getOption()} theme="test" style={{height:500}}/>
				</Card>
				<Card title="折线图表之二" style={{marginTop: 10}}>
					<ReactEcharts option={this.getOption2()} theme="test" style={{height:500}}/>
				</Card>
				<Card title="折线图表之三" style={{marginTop: 10}}>
					<ReactEcharts option={this.getOption3()} theme="test" style={{height:500}}/>
				</Card>
			</div>
		)
	}
}