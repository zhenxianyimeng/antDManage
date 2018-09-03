import React from 'react';
import {Card, Table, Modal, Button, message, Badge} from 'antd';
import axios from './../../axios/index';
import Utils from '../../utils/utils'
export default class BasicTable extends React.Component{

	state = {

	};
	params={
		page: 1
	};

	handleDelete = (item)=> {
		let id = item.id;
		Modal.confirm({
			title:'确认',
			content:'确认删除当前数据么?',
			onOk:() => {
				message.success("删除成功");
				this.request();
			}
		})
	}

	handleOnchange = (pagination, filters, sorter)=> {
		this.setState({
			sortOrder: sorter.order
		})
	}

	componentDidMount(){
		this.request();
	}

	// //动态mock数据
	request = () =>{
		let _this = this;
		axios.ajax({
			url: '/table/high/list',
			data:{
				params:{
					page:this.params.page,
				},
				isShowLoading: true,
			}
		}).then((res) => {
			if(res.code == 0){
				res.result.list.map((item, index) => {
					item.key = index;
				})
				this.setState({
					dataSource: res.result.list,
				})
			}
		})

	};


	render(){
		const columns = [
			{
				title:'id',
				width: 80,
				dataIndex: 'id'
			},
			{
				title:'用户名',
				width: 80,
				dataIndex: 'userName'
			},
			{
				title:'性别',
				width: 80,
				dataIndex: 'sex',
				render(sex){
					return sex==1? '男':'女';
				}
			},
			{
				title:'状态',
				width: 80,
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
				width: 80,
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
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'地址',
				width: 120,
				dataIndex: 'address'
			},
			{
				title:'早起时间',
				width: 80,
				dataIndex: 'time'
			},

		];

		const columns3 = [
			{
				title:'id',
				width: 80,
				dataIndex: 'id'
			},
			{
				title:'用户名',
				width: 80,
				dataIndex: 'userName'
			},
			{
				title:'性别',
				width: 80,
				dataIndex: 'sex',
				render(sex){
					return sex==1? '男':'女';
				}
			},
			{
				title:'年龄',
				width: 80,
				dataIndex: 'age',
				sorter: (a, b) => {
					return a.age - b.age;
				},
				sortOrder: this.state.sortOrder
			},
			{
				title:'状态',
				width: 80,
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
				width: 80,
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
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'地址',
				width: 120,
				dataIndex: 'address'
			},
			{
				title:'早起时间',
				width: 80,
				dataIndex: 'time'
			},

		];

		const columns2 = [
			{
				title:'id',
				width: 80,
				fixed: 'left',
				dataIndex: 'id'
			},
			{
				title:'用户名',
				width: 80,
				fixed: 'left',
				dataIndex: 'userName'
			},
			{
				title:'性别',
				width: 80,
				dataIndex: 'sex',
				render(sex){
					return sex==1? '男':'女';
				}
			},
			{
				title:'状态',
				width: 80,
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
				width: 80,
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
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'生日',
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'生日',
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'生日',
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'生日',
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'生日',
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'生日',
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'生日',
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'生日',
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'生日',
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'生日',
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'生日',
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'地址',
				width: 120,
				dataIndex: 'address'
			},
			{
				title:'早起时间',
				width: 80,
				dataIndex: 'time'
			},

		];

		const columns4 = [
			{
				title:'id',
				width: 80,
				dataIndex: 'id'
			},
			{
				title:'用户名',
				width: 80,
				dataIndex: 'userName'
			},
			{
				title:'性别',
				width: 80,
				dataIndex: 'sex',
				render(sex){
					return sex==1? '男':'女';
				}
			},
			{
				title:'年龄',
				width: 80,
				dataIndex: 'age',
				// sorter: (a, b) => {
				// 	return a.age - b.age;
				// },
				// sortOrder: this.state.sortOrder
			},
			{
				title:'状态',
				width: 80,
				dataIndex: 'state',
				render(state){
					let config = {
						// '1':'青铜',
						// '2':'白银',
						// '3':'黄金',
						// '4':'铂金',
						// '5':'砖石'
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
				width: 80,
				dataIndex: 'interest',
				render(interest){
					let config = {
						// '1':'游泳',
						// '2':'篮球',
						// '3':'足球',
						// '4':'跑步',
						// '5':'篮球',
						// '6':'骑行',
						// '7':'徒步',
						// '8':'旅游',
						'1': <Badge status="success" text="成功"/>,
						'2': <Badge status="error" text="报错"/>,
						'3': <Badge status="default" text="正常"/>,
						'4': <Badge status="processing" text="进行中"/>,
						'5': <Badge status="warning" text="警告"/>,
						// '2':'篮球',
						// '3':'足球',
						// '4':'跑步',
						// '5':'篮球',
						// '6':'骑行',
						// '7':'徒步',
						// '8':'旅游',
					}
					return config[interest];
				}
			},
			{
				title:'生日',
				width: 120,
				dataIndex: 'birthday'
			},
			{
				title:'地址',
				width: 120,
				dataIndex: 'address'
			},
			{
				title:'操作',
				width: 80,
				render:(text, item) => {
					return <Button size="small" onClick={()=>{this.handleDelete(item)}}>删除</Button>
				}
			},

		];

		return(
			<div>
				<Card title="头部固定">
					<Table
						bordered
						columns={columns} dataSource={this.state.dataSource}
						pagination={false}
						scroll={{y:240}}
					>
					</Table>
				</Card>
				<Card title="左侧固定" style={{margin: '10px 0'}}>
					<Table
						bordered
						columns={columns2} dataSource={this.state.dataSource}
						pagination={false}
						scroll={{y:240, x:2000}}
					>
					</Table>
				</Card>
				<Card title="表格排序" style={{margin: '10px 0'}}>
					<Table
						bordered
						columns={columns3} dataSource={this.state.dataSource}
						pagination={false}
						onChange={this.handleOnchange}
					>
					</Table>
				</Card>
				<Card title="操作按钮" style={{margin: '10px 0'}}>
					<Table
						bordered
						columns={columns4} dataSource={this.state.dataSource}
						pagination={false}
					>
					</Table>
				</Card>
			</div>
		)
	}
}