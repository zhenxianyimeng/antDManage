import React from 'react';
import {
	Card, Form, Button, Input,
	Checkbox, Radio, Select, InputNumber,
	Switch, DatePicker, TimePicker, Upload, Icon, message
} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea =Input.TextArea;

class FormRegister extends React.Component {

	state={}

	getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	handleSumbit = ()=>{
		let userInfo = this.props.form.getFieldsValue();
		console.log(JSON.stringify(userInfo));
		message.success(`${userInfo.userName}恭喜您通过${JSON.stringify(userInfo)}`)

	}

	handleChange = (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			this.getBase64(info.file.originFileObj, imageUrl => this.setState({
				userImg: imageUrl,
				loading: false,
			}));
		}
	}

	render() {
		const {getFieldDecorator} = this.props.form;

		const formItemLayout={
			labelCol:{
				xs:24,
				sm:4
			},
			wrapperCol:{
				xs:24,
				sm:12
			}
		}

		const offsetLayout = {
			wrapperCol:{
				xs:24,
				sm:{
					span:12, offset:4
				}
			}
		}

		return (
			<div>
				<Card title="注册表单">
					<Form layout="horizontal">
						<FormItem label="用户名" {...formItemLayout}>
							{
								getFieldDecorator('userName', {
									initialValue: '',
									rules: [
										{
											required: true,
											message: '用户名不能为空',
										}
									]
								})(<Input placeholder="请输入用户名"></Input>)
							}
						</FormItem>
						<FormItem label="密码" {...formItemLayout}>
							{
								getFieldDecorator('userPwd', {
									initialValue: '',
								})(<Input type="password" placeholder="请输入密码"></Input>)
							}
						</FormItem>
						<FormItem label="性别" {...formItemLayout}>
							{
								getFieldDecorator('sex', {
									initialValue: '1',
								})(
									<RadioGroup>
										<Radio value="1">男</Radio>
										<Radio value="2">女</Radio>
									</RadioGroup>
								)
							}
						</FormItem>
						<FormItem label="年龄" {...formItemLayout}>
							{
								getFieldDecorator('age', {
									initialValue: 18
								})(
									<InputNumber>
									</InputNumber>
								)
							}
						</FormItem>
						<FormItem label="当前状态" {...formItemLayout}>
							{
								getFieldDecorator('state', {
									initialValue: "1"
								})(
									<Select>
										<Option value="1">咸鱼</Option>
										<Option value="2">咸鱼1</Option>
										<Option value="3">咸鱼2</Option>
										<Option value="4">咸鱼3</Option>
									</Select>
								)
							}
						</FormItem>
						<FormItem label="爱好" {...formItemLayout}>
							{
								getFieldDecorator('interest', {
									initialValue: ['1','7']
								})(
									<Select mode="multiple">
										<Option value="1">游泳</Option>
										<Option value="2">篮球</Option>
										<Option value="3">健身</Option>
										<Option value="4">跑步</Option>
										<Option value="5">爬山</Option>
										<Option value="6">骑行</Option>
										<Option value="7">旅游</Option>
									</Select>
								)
							}
						</FormItem>
						<FormItem label="是否已婚" {...formItemLayout}>
							{
								getFieldDecorator('isMarried', {
									valuePropName: 'checked',
									initialValue: true
								})(
									<Switch/>
								)
							}
						</FormItem>
						<FormItem label="生日" {...formItemLayout}>
							{
								getFieldDecorator('birthday', {
									initialValue: moment('2018-08-08 12:59:11')
								})(
									<DatePicker
									showTime
									format="YYYY-MM-DD HH:mm:ss"
									/>
								)
							}
						</FormItem>
						<FormItem label="联系地址" {...formItemLayout}>
							{
								getFieldDecorator('address',{
									initialValue: '浙江省杭州市西湖区'
								})(
									<TextArea
										autosize={{
											minRows: 4,
											maxRows:6,
										}}
									/>
								)
							}
						</FormItem>
						<FormItem label="早期时间" {...formItemLayout}>
							{
								getFieldDecorator('time',{
								})(
									<TimePicker

									/>
								)
							}
						</FormItem>
						<FormItem label="头像" {...formItemLayout}>
							{
								getFieldDecorator('userImg',{
								})(
									<Upload
										listType="picture-card"
										showUploadList={false}
										action="//jsonplaceholder.typicode.com/posts/"
										onChange={this.handleChange}
									>
										{this.state.userImg?<img src={this.state.userImg}/> :
										<Icon type="plus"/>
										}
									</Upload>
								)
							}
						</FormItem>
						<FormItem {...offsetLayout}>
							{
								getFieldDecorator('userImg')(
									<Checkbox>我已阅读<a href="#">协议</a></Checkbox>
								)
							}
						</FormItem>
						<FormItem {...offsetLayout}>
							{
								<Button type="primary" onClick={this.handleSumbit}>注册</Button>
							}
						</FormItem>

						{/*<FormItem  {...offsetLayout}>*/}
							{/*{*/}
								{/*getFieldDecorator('userImg')(*/}
									{/*<Checkbox>我已阅读<a href="#">协议</a><Checkbox/>*/}
								{/*)*/}
							{/*}*/}
						{/*</FormItem>*/}

					</Form>
				</Card>
			</div>
		)
	}
}

export default Form.create()(FormRegister)