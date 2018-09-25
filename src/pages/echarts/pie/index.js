import React from 'react';
import {Card} from 'antd';
import echartTheme from './../themeLight';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Pie extends React.Component {

	componentWillMount() {
		echarts.registerTheme('test', echartTheme)
	}

	getOption = () => {
		let option = {
			title:{
				text:'用户骑行数据',
				x:'center'
			},
			legend:{
				orient: 'vertical',
				right:10,
				top:20,
				bottom:20,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			tooltip:{
				trigger:'item',
				formatter:'{a}<br/>{b}:{c}({d}%)'
			},
			series:[
				{
					name: '订单量',
					type: 'pie',
					data:[
						{
							value:1000,
							name:'周一',
						},
						{
							value:1000,
							name:'周二',
						},
						{
							value:2000,
							name:'周三',
						},
						{
							value:1500,
							name:'周四',
						},
						{
							value:3000,
							name:'周五',
						},
						{
							value:2000,
							name:'周六',
						},
						{
							value:1200,
							name:'周日',
						},
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
				x:'center'
			},
			legend:{
				orient: 'vertical',
				right:10,
				top:20,
				bottom:20,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			tooltip:{
				trigger:'item',
				formatter:'{a}<br/>{b}:{c}({d}%)'
			},
			series:[
				{
					name: '订单量',
					type: 'pie',
					radius:['50%','80%'],
					center:['50%', '60%'],
					data:[
						{
							value:1000,
							name:'周一',
						},
						{
							value:1000,
							name:'周二',
						},
						{
							value:2000,
							name:'周三',
						},
						{
							value:1500,
							name:'周四',
						},
						{
							value:3000,
							name:'周五',
						},
						{
							value:2000,
							name:'周六',
						},
						{
							value:1200,
							name:'周日',
						},
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
				x:'center'
			},
			legend:{
				orient: 'vertical',
				right:10,
				top:20,
				bottom:20,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			tooltip:{
				trigger:'item',
				formatter:'{a}<br/>{b}:{c}({d}%)'
			},
			series:[
				{
					name: '订单量',
					type: 'pie',
					// radius:['50%','80%'],
					// center:['50%', '60%'],
					data:[
						{
							value:1000,
							name:'周一',
						},
						{
							value:1000,
							name:'周二',
						},
						{
							value:2000,
							name:'周三',
						},
						{
							value:1500,
							name:'周四',
						},
						{
							value:3000,
							name:'周五',
						},
						{
							value:2000,
							name:'周六',
						},
						{
							value:1200,
							name:'周日',
						},
					].sort((a,b)=>{
						return a.value - b.value;
					}),
					roseType:'radius',
				}
			]
		}

		return option;
	}

	render() {
		return (
			<div>
				<Card title="饼图表之一">
					<ReactEcharts option={this.getOption()} theme="test" style={{height:500}}/>
				</Card>
				<Card title="饼图表之二" style={{marginTop: 10}}>
					<ReactEcharts option={this.getOption2()} theme="test" style={{height:500}}/>
				</Card>
				<Card title="饼图表之三" style={{marginTop: 10}}>
					<ReactEcharts option={this.getOption3()} theme="test" style={{height:500}}/>
				</Card>
			</div>
		)
	}
}