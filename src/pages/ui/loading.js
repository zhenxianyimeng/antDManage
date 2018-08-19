import React from 'react'
import {Card, Button, Spin, Icon, Alert} from 'antd'
import "./ui.less"

export default class Loading extends React.Component {

	render() {
		const icon = <Icon type="plus" style={{fontSize: 24}}/>
		const iconLoading = <Icon type="loading" style={{fontSize: 24}}/>

		return (
			<div>
				<Card title="spin用法" className="card-wrap">
					<Spin size="small"></Spin>
					<Spin style={{margin: '0 10px'}}/>
					<Spin size="large"/>
					<Spin indicator={icon} style={{marginLeft: 10}} spinning={true}/>

				</Card>
				<Card title="内容遮罩">
					<Alert
						message="React"
						description="你好"
						type="info"
					/>
					<Alert
						message="React"
						description="你好"
						type="warning"
					/>
					<Spin tip="加载中...">
						<Alert
							message="React"
							description="你好"
							type="warning"
						/>
					</Spin>
					<Spin indicator={iconLoading}>
						<Alert
							message="React"
							description="你好"
							type="warning"
						/>
					</Spin>
				</Card>
			</div>
		);
	}
}