import React from 'react';
import {Card, Button, Modal, Form, Input, Radio, DatePicker,Select} from 'antd';
import axios from '../../axios';
import utils from '../../utils/utils';
import ETable from '../../components/ETable';
import BaseForm from '../../components/BaseForm';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
export default class User extends React.Component {
	params = {
		page: 1,
	};

	state = {
		isVisible: false,
	};

	handleSubmit = ()=> {
		let type = this.state.type;
		let data = this.userForm.props.form.getFieldsValue();
		axios.ajax({
			url:'/user/add',
			data:{
				params: data
			}
		}).then((res)=>{
			if(res.code == 0){
				this.setState({
					isVisible: false,
				});
				this.userForm.props.form.resetFields();
				this.requestList();
			}
		})
	}

	handleOperate = (type) => {
		if (type == 'create') {
			this.setState({
				type,
				isVisible: true,
				title: '创建员工',
			})
		}
	}

	formList = [
		{
			type: 'INPUT',
			label: '用户名',
			field: 'user_name',
			placeholder: '请输入用户名',
			width: 130,
		},
		{
			type: 'INPUT',
			label: '手机号',
			field: 'user_mobile',
			placeholder: '请输入手机号',
			width: 130,
		},
		{
			type: 'DATE',
			label: '入职日期',
			field: 'user_date',
			placeholder: '请输入日期',
			width: 100,
		},
	]

	componentDidMount() {
		this.requestList();
	}

	handleFilterSubmit = (params) => {
		this.params = params;
		this.requestList();
	};

	requestList = () => {
		axios.requestList(this, '/user/list', this.params)
	}

	render() {
		const columns = [
			{
				title: 'id',
				dataIndex: 'id'
			},
			{
				title: '用户名',
				dataIndex: 'username'
			},
			{
				title: '性别',
				dataIndex: 'sex',
				render(sex) {
					return sex == 1 ? '男' : '女'
				}
			},
			{
				title: '状态',
				dataIndex: 'state',
				render(state) {
					let config = {
						'1': '咸鱼一条',
						'2': '风华浪子',
						'3': '北大才子一枚',
						'4': '百度FE',
						'5': '创业者'
					}
					return config[state];
				}
			},
			{
				title: '爱好',
				dataIndex: 'interest',
				render(interest) {
					let config = {
						'1': '游泳',
						'2': '打篮球',
						'3': '踢足球',
						'4': '跑步',
						'5': '爬山',
						'6': '骑行',
						'7': '桌球',
						'8': '麦霸'
					}
					return config[interest];
				}
			},
			{
				title: '生日',
				dataIndex: 'birthday'
			},
			{
				title: '联系地址',
				dataIndex: 'address'
			},
			{
				title: '早起时间',
				dataIndex: 'time'
			},
		]
		return (
			<div>
				<Card>
					<BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
				</Card>
				<Card style={{marginTop: 10}}>
					<Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>创建员工</Button>
					<Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
					<Button type="primary" onClick={() => this.handleOperate('detail')}>员工详情</Button>
					<Button type="primary" icon="delete" onClick={() => this.handleOperate('delete')}>删除员工</Button>
					{/*<Button type="primary" style={{marginLeft: 10}} onClick={this.handleConfirm}>结束订单</Button>*/}
				</Card>
				<div className="content-wrap">
					<ETable
						columns={columns}
						updateSelectedItem={utils.updateSelectedItem.bind(this)}
						selectedRowKeys={this.state.selectedRowKeys}
						dataSource={this.state.list}
						selectedItem={this.state.selectedItem}
						pagination={false}
					/>
				</div>
				<Modal title={this.state.title}
				       visible={this.state.isVisible}
				       onOk={this.handleSubmit}
				       onCancel={() => {
				       	    this.userForm.props.form.resetFields();
					       this.setState({
						       isVisible: false
					       })
				       }}
				       width={600}
				>
					<UserForm type={this.state.type} wrappedComponentRef={(inst)=>this.userForm = inst}></UserForm>
				</Modal>
			</div>
		)
	}
}

class UserForm extends React.Component {
	render() {
		const formItemLayout = {
			labelCol: {span: 5},
			wrapperCol: {span: 19}
		}

		const {getFieldDecorator} = this.props.form;

		return (
			<Form layout="horizontal">
				<FormItem label="用户名" {...formItemLayout}>
					{
						getFieldDecorator('user_name')(
							<Input type="text" placeholder="请输入用户名"/>
						)
					}
				</FormItem>
				<FormItem label="性别" {...formItemLayout}>
					{
						getFieldDecorator('sex')(
							<RadioGroup>
								<Radio value={1}>男</Radio>
								<Radio value={2}>女</Radio>
							</RadioGroup>
						)
					}
				</FormItem>
				<FormItem label="状态" {...formItemLayout}>
					{
						getFieldDecorator('state')(

							<Select>
								<Option value={1}>咸鱼一条</Option>
								<Option value={2}>风华浪子</Option>
								<Option value={3}>北大才子</Option>
								<Option value={4}>我是谁</Option>
								<Option value={5}>我在哪里</Option>
								{/*<Option value={1}>咸鱼一条</Option>*/}
							</Select>
						)
					}
				</FormItem>

				<FormItem label="生日" {...formItemLayout}>
					{
						getFieldDecorator('birthday')(
							<DatePicker/>
						)
					}
				</FormItem>
				<FormItem label="联系地址" {...formItemLayout}>
					{
						getFieldDecorator('address')(
							<TextArea rows={3} placeholder="请输入联系地址"/>
						)
					}
				</FormItem>
			</Form>
		);
	}
}
UserForm = Form.create({})(UserForm);