import React from 'react'
import {Card, Button, Modal} from 'antd'
import './ui.less'

export default class Buttons extends React.Component {

	state = {
		showModal1:false,
		showModal2:false,
		showModal3:false,
		showModal4:false,

	}

	handleOpen = (type) => {
		this.setState({
			[type]:true
		})
	}

	handleConfirm = (type) =>{
		Modal[type]({
			title: '确定',
			content: '确定了么',
			onOk(){
				console.log('ok')
			},
			onCancel(){
				console.log("Cancel")
			}
		})
	}

	render() {
		return (
			<div>
				<Card title="基础模态框" className="card-warp">
					<Button type="primary" onClick={()=>this.handleOpen('showModal1')}>Open</Button>
					<Button type="primary" onClick={()=>this.handleOpen('showModal2')}>自定义页脚</Button>
					<Button type="primary" onClick={()=>this.handleOpen('showModal3')}>顶部20px弹框</Button>
					<Button type="primary" onClick={()=>this.handleOpen('showModal4')}>水平垂直居中</Button>
				</Card>
				<Card title="信息确认框" className="card-warp">
					<Button type="primary" onClick={()=>this.handleConfirm('confirm')}>Confirm</Button>
					<Button type="primary" onClick={()=>this.handleConfirm('info')}>Info</Button>
					<Button type="primary" onClick={()=>this.handleConfirm('success')}>Success</Button>
					<Button type="primary" onClick={()=>this.handleConfirm('warning')}>Warning</Button>
				</Card>

				<Modal visible={this.state.showModal1} title="React"
						onCancel={()=>{
							this.setState({
								showModal1: false,
							})
						}}
				>
					<p>这里是一个弹窗</p>
				</Modal>

				<Modal visible={this.state.showModal2} title="React"
				       okText="好的"
				       cancelText="算了"
				       onCancel={()=>{
					       this.setState({
						       showModal2: false,
					       })
				       }}
				>
					<p>这里是一个弹窗</p>
				</Modal>

				<Modal visible={this.state.showModal3} title="React"
				       style={{top:20}}
				       onCancel={()=>{
					       this.setState({
						       showModal3: false,
					       })
				       }}
				>
					<p>这里是一个弹窗</p>
				</Modal>

				<Modal visible={this.state.showModal4}
				       title="React"
				       warpClassName="vertical-center-modal"
				       onCancel={()=>{
					       this.setState({
						       showModal4: false,
					       })
				       }}
				>
					<p>这里是一个弹窗水平</p>
				</Modal>

			</div>

		);
	}
}