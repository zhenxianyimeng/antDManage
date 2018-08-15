import React from 'react'
import {HashRouter, Route, Link} from 'react-router-dom'

export default class Info extends React.Component{


	render(){
		return (
			<div>
				这里是测试动态路由功能
				动态路由的值是：{this.props.match.params.value}
			</div>
		);
	}
}