import React from 'react';
import {Card, Table} from 'antd';

export default class BasicTable extends React.Component{

	state={
		dataSource2 : [],
	}

	componentDidMount(){
		const dataSource=[
			{
				id:'0',
				userName:'Jack',
				sex:'1',
				state:'1',
				interest:'1',
				birthday:'2000-01-01',
				address:'浙江省杭州市',
				time:'09:00'
			},
			{
				id:'1',
				userName:'Tim',
				sex:'1',
				state:'1',
				interest:'1',
				birthday:'2000-01-01',
				address:'浙江省杭州市',
				time:'09:00'
			},
			{
				id:'2',
				userName:'Jerry',
				sex:'1',
				state:'1',
				interest:'1',
				birthday:'2000-01-01',
				address:'浙江省杭州市',
				time:'09:00'
			}
		]

		this.setState({
			dataSource
		})
	}

	render(){
		const columns = [
			{
				title:'id',
				dataIndex: 'id'
			},
			{
				title:'用户名',
				dataIndex: 'userName'
			},
			{
				title:'性别',
				dataIndex: 'sex'
			},
			{
				title:'状态',
				dataIndex: 'state'
			},
			{
				title:'爱好',
				dataIndex: 'interest'
			},
			{
				title:'生日',
				dataIndex: 'birthday'
			},
			{
				title:'地址',
				dataIndex: 'address'
			},
			{
				title:'早期时间',
				dataIndex: 'time'
			},

		]

		return(
			<div>
				<Card title="基础表格">
					<Table
						bordered
						columns={columns} dataSource={this.state.dataSource}
						pagination={false}
					>
					</Table>
				</Card>
				<Card title="动态数据渲染表格" style={{margin: '10px 0'}}>
					<Table
						bordered
						columns={columns} dataSource={this.state.dataSource2}
						pagination={false}
					>
					</Table>
				</Card>
			</div>
		)
	}
}