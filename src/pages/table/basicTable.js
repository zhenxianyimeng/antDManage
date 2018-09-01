import React from 'react';
import {Card, Table, Modal, Button, message} from 'antd';
import axios from './../../axios/index';

export default class BasicTable extends React.Component{

	state={
		dataSource2 : [],
	}

	handleDelete = () => {
		let rows = this.state.selectedRows;
		let ids = [];
		rows.map((item) => {
			ids.push(item.id);
		})
		Modal.confirm({
			title:'删除提示',
			content:`你确定要删除么?${ids.join(',')}`,
			onOk:() => {
				message.success("删除成功");
				this.request();
			}
		})
	}

	onRowClick = (record, index) =>{
		let selectKey = [index];
		Modal.info({
			title:'信息',
			content:JSON.stringify(record),
		})
		this.setState({
			selectedRowKeys: selectKey,
			selectedItem: record,
		})
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
		dataSource.map((item, index) =>{
			item.key = index;
		});

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
				res.result.map((item, index) => {
					item.key = index;
				})
				this.setState({
					dataSource2: res.result,
					selectedRows:null,
					selectedRowKeys:[],
				})
			}
		})

	};


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
				dataIndex: 'sex',
				render(sex){
					return sex==1? '男':'女';
				}
			},
			{
				title:'状态',
				dataIndex: 'state',
				render(state){
					let config = {
						'1':'青铜',
						'2':'白银',
						'3':'黄金',
						'4':'铂金',
						'5':'砖石'
					}
					return config[state];
				}
			},
			{
				title:'爱好',
				dataIndex: 'interest',
				render(interest){
					let config = {
						'1':'游泳',
						'2':'篮球',
						'3':'足球',
						'4':'跑步',
						'5':'篮球',
						'6':'骑行',
						'7':'徒步',
						'8':'旅游',
					}
					return config[interest];
				}
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

		];

		const {selectedRowKeys} = this.state;

		const rowSelection = {
			type: 'radio',
			selectedRowKeys,
		};

		const rowCheckSelection = {
			type: 'check',
			selectedRowKeys,
			onChange:(selectedRowKeys, selectedRows)=>{
				let ids = [];
				selectedRows.map((item)=>{
					ids.push(item.id)
				})
				this.setState({
					selectedRowKeys,
					selectedRows,
				})
			}
		};



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
				<Card title="单选" style={{margin: '10px 0'}}>
					<Table
						onRow={(record, index) => {
							return {
								onClick: () => {
									this.onRowClick(record, index)
								},       // 点击行
							};
						}}
						rowSelection={rowSelection}
						bordered
						columns={columns} dataSource={this.state.dataSource2}
						pagination={false}
					>
					</Table>
				</Card>
				<Card title="复选" style={{margin: '10px 0'}}>
					<div style={{marginBottom: 10}}>
						<Button onClick={this.handleDelete}>删除</Button>
					</div>
					<Table
						// onRow={(record, index) => {
						// 	return {
						// 		onClick: () => {
						// 			this.onRowClick(record, index)
						// 		},       // 点击行
						// 	};
						// }}
						rowSelection={rowCheckSelection}
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