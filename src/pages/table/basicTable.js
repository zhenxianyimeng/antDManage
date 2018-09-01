import React from 'react';
import {Card, Table} from 'antd';
import axios from './../../axios/index';

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

		this.request();
	}

	// //动态mock数据
	request = () =>{

		axios.ajax({
			url: '/table/list',
			data:{
				params:{
					page:1,
				},
				isShowLoading: true,
			}
		}).then((res) => {
			if(res.code == 0){
				this.setState({
					dataSource2: res.result,
				})
			}
		})

		// let baseUrl = 'https://www.easy-mock.com/mock/5b88888389484103289808e1/api'
		// axios.get(baseUrl + '/table/list').then(res=>{
		// 	if(res.status == '200'){
		// 		this.setState({
		// 			dataSource2:res.data.result
		// 		})
		// 	}
		// 	// console.log(JSON.stringify(res));
		// })
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