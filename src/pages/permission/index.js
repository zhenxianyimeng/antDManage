import React from 'react';
import {Card, Button, Modal,Select, Form, Input, Radio, Tree} from 'antd';
import Etable from './../../components/ETable';
import ETable from "../../components/ETable/index";
import Utils from '../../utils/utils';
import axios from '../../axios';
import menuConfig from '../../resource/menuConfig';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

export default class PermissionUser extends React.Component {

	state = {
		isRoleVisible:false,
		isPermVisible: false,
	}

	componentWillMount() {
		axios.requestList(this, "/role/list",{});
	}

	handleRole = ()=> {
		this.setState({
			isRoleVisible:true
		})
	}

	handlePermission = ()=>{
		let item = this.state.selectedItem;
		if(!item){
			Modal.info({
				title: '信息',
				content: '请选择一个角色'
			})
			return;
		}
		this.setState({
			isPermVisible: true,
			detailInfo: item,
			menuInfo:item.menus,
		})

	}

	handlePermEditSubmit = ()=> {
		let data = this.premForm.props.form.getFieldsValue();
		data.role_id = this.state.selectedItem.id;
		data.menus = this.state.menuInfo;
		axios.ajax({
			url:'/permission/edit',
			data:{
				params:{
					...data
				}
			}
		}).then((res)=>{
			if(res){
				this.setState({
					isPermVisible: false,
				})
				axios.requestList(this, "/role/list",{});
			}
		})
	}

	handleRoleSubmit = ()=> {
		let data = this.roleForm.props.form.getFieldsValue();
		axios.ajax({
			url : '/role/create',
			data:{
				params:data,
			}
		}).then((res) => {
			if(res.code == 0){
				this.setState({
					isRoleVisible:false
				})
				this.roleForm.props.form.resetFields();
				axios.requestList(this, "/role/list",{});
			}
		})
	}

	render() {
		const columns = [
			{
				title: '角色ID',
				dataIndex: 'id'
			},
			{
				title: '角色名称',
				dataIndex: 'role_name'
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				render: Utils.formateDate
			},
			{
				title: '使用状态',
				dataIndex: 'status',
				render(status){
					return status == 1?'启用':'停用'
				}
			},
			{
				title: '授权时间',
				dataIndex: 'authorize_time',
				render: Utils.formateDate
			},
			{
				title: '授权人',
				dataIndex: 'authorize_user_name',
			},
		]
		return (
			<div>
				<Card>
					<Button type="primary" onClick={this.handleRole}>创建角色</Button>
					<Button type="primary" onClick={this.handlePermission}>设置权限</Button>
					<Button type="primary">用户授权</Button>
				</Card>
				<div className="content-wrap">
					<ETable
						updateSelectedItem={Utils.updateSelectedItem.bind(this)}
						selectedRowKeys={this.state.selectedRowKeys}
						dataSource={this.state.list}
						columns={columns}
					/>
				</div>
				<Modal title="创建角色" visible={this.state.isRoleVisible}
					onOk={this.handleRoleSubmit}
				       onCancel={()=>{
					       this.roleForm.props.form.resetFields();
				       	this.setState({
					        isRoleVisible:false,
				        })
				       }}
				>
					<RoleForm wrappedComponentRef={(inst)=> this.roleForm = inst}>
					</RoleForm>
				</Modal>
				<Modal title="设置权限"
					visible={this.state.isPermVisible}
				       width={600}
				       onOk={this.handlePermEditSubmit}
				       onCancel={()=>{
				       	this.setState({
					        isPermVisible: false,
				        })
				       }}
				>
					<PermEditForm
						wrappedComponentRef={(inst)=> this.premForm = inst}
						detailInfo={this.state.detailInfo}
						menuInfo={this.state.menuInfo}
						patchMenuInfo={(checkedKeys)=>{
							this.setState({
								menuInfo: checkedKeys,
							})
						}}
					/>
				</Modal>
			</div>
		)
	}
}

class RoleForm extends React.Component {

	render() {

		const formItemLayout = {
			labelCol: {span: 5},
			wrapperCol: {span: 19}
		}

		const {getFieldDecorator} = this.props.form;

		return (
			<Form layout="horizontal">
				<FormItem label="角色名称" {...formItemLayout}>
					{
							getFieldDecorator('role_name')(
								<Input type="text" placeholder="请输入角色名称"/>
							)
					}
				</FormItem>

				<FormItem label="状态" {...formItemLayout}>
					{
							getFieldDecorator('state')(
								<Select>
									<Option value={1}>开启</Option>
									<Option value={2}>关闭</Option>
								</Select>
							)
					}
				</FormItem>
			</Form>
		);
	}
}

RoleForm = Form.create({})(RoleForm);

class PermEditForm extends React.Component{

	onCheck = (checkedKeys)=> {
		this.props.patchMenuInfo(checkedKeys);
	}

	renderTreeNode = (data)=>{
		return data.map((item)=>{
			if(item.children){
				return(<TreeNode title={item.title} key={item.key}>
					{this.renderTreeNode(item.children)}
				</TreeNode>)

			}else {
				return <TreeNode title={item.title} key={item.key}/>
			}
		})
	}

	render(){
		const formItemLayout = {
			labelCol: {span: 5},
			wrapperCol: {span: 19}
		}

		const {getFieldDecorator} = this.props.form;

		const detail_info = this.props.detailInfo;
		const menuInfo = this.props.menuInfo;

		return(
			<Form layout="horizontal">
				<FormItem label="角色名称" {...formItemLayout}>
					<Input disabled placeholder={detail_info.role_name} >

					</Input>
				</FormItem>
				<FormItem label="状态" {...formItemLayout}>
					{
						getFieldDecorator('status',{
							initialValue:'1'
						})(
							<Select>
								<Option value="1">启用</Option>
								<Option value="2">停用</Option>
							</Select>
						)
					}
				</FormItem>
				<Tree
					checkable
					defaultExpandAll
					onCheck={(checkedKeys)=>{
						this.onCheck(checkedKeys)
					}}
					checkedKeys={menuInfo}
				>
					<TreeNode title="平台权限" key="platform_all">
						{this.renderTreeNode(menuConfig)}
					</TreeNode>
				</Tree>
			</Form>
		);
	}
}
PermEditForm = Form.create({})(PermEditForm);
