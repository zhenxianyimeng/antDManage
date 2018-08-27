import React from 'react'
import {Card, Tabs, Button, message, Icon} from 'antd'
import './ui.less'
export default class Tabss extends React.Component{

	newTabIndex = 0;

	handleCallback= (key)=>{
		message.info("选择了Tab:" + key)
	}

	onChange= (activeKey)=>{
		this.setState({
			activeKey
		})
	}

	onEdit = (targetKey, action) => {
		this[action](targetKey);
	}

	add = () => {
		const panes = this.state.panes;
		const activeKey = `newTab${this.newTabIndex++}`;
		panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
		this.setState({ panes, activeKey });
	}

	remove = (targetKey) => {
		let activeKey = this.state.activeKey;
		let lastIndex;
		this.state.panes.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		});
		const panes = this.state.panes.filter(pane => pane.key !== targetKey);
		if (lastIndex >= 0 && activeKey === targetKey) {
			activeKey = panes[lastIndex].key;
		}
		this.setState({ panes, activeKey });
	}


	componentWillMount() {
		const panes = [
			{
				title: 'Tab 1',
				content: 'Tab 1',
				key: '1'
			},
			{
				title: 'Tab 2',
				content: 'Tab2 ',
				key: '2'
			},
			{
				title: 'Tab 3',
				content: 'Tab 3',
				key: '3'
			}
		]

		// this.setState({
		// 	activeKey: panes[1].key,
		// 	panes: panes
		// })

		this.setState({
			activeKey: panes[1].key,
			panes: panes
		});
	}


	render(){
		const { TabPane } = Tabs;
		// console.log(this.state);

		return(
			<div>
				<Card title="Tab页签" className="card-wrap">
					<Tabs defaultActiveKey="1" onChange={this.handleCallback}>
						<TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
						<TabPane tab="Tab 2" key="2" disabled>Content of tab 2</TabPane>
						<TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
					</Tabs>
				</Card>

				<Card title="Tab带图的页签" className="card-wrap">
					<Tabs defaultActiveKey="1" onChange={this.handleCallback}>
						<TabPane tab={<span><Icon type="plus"/>Tab 1</span>} key="1">Content of tab 1</TabPane>
						<TabPane tab={<span><Icon type="edit"/>Tab 2</span>}  key="2">Content of tab 2</TabPane>
						<TabPane tab={<span><Icon type="delete"/>Tab 3</span>}  key="3">Content of tab 3</TabPane>
					</Tabs>
				</Card>


				<Card title="Tab带图的页签" className="card-wrap">
					<Tabs
					      type="editable-card"
					      activeKey={this.state.activeKey}
					      onChange={this.onChange}
					      onEdit={this.onEdit}
					>
						{
							this.state.panes.map((panel)=>{
								return <TabPane
									tab={panel.title}
									key={panel.key}
								></TabPane>
							})
						}
					</Tabs>
				</Card>
			</div>
		)
	}
}