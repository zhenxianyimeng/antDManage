import React from 'react'
import {Row, Col} from 'antd'
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios'
import {connect} from 'react-redux';


 class Header extends React.Component {

	state = {}

	componentWillMount() {
		this.setState({
			userName: '真仙忆梦'
		})
		setInterval(() => {
			let sysTime = Util.formateDate(new Date().getTime())
			this.setState({
				sysTime
			})
		}, 1000)
		this.getWeatherAPIData();
	}

	getWeatherAPIData() {
		let city = '杭州';
		axios.jsonp({
			url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=YGtqUyHOKe5xtaDzi2pmMZVEMdDNlG8F'
		}).then((res) => {

			if (res.status == 'success') {
				let data = res.results[0].weather_data[0];
				// console.log(data)
				this.setState({
					dayPictureUrl: data.dayPictureUrl,
					weather: data.weather
				})
			}
		})
	}

	render() {
		const menuType = this.props.menuType;
		return (
			<div className="header">
				<Row className="header-top">
					{
						menuType ?
							<Col span="6" className="logo">
								<img src="/asserts/logo-ant.svg"/>
								<span>单车管理系统</span>
							</Col> : ''
					}
					<Col span={menuType ? 18 : 24}>
						<span>欢迎，{this.state.userName}</span>
						<a href="#">退出</a>
					</Col>
				</Row>
				{
					menuType ? '' :
						<Row className="breadcrumb">
							<Col span="4" className="breadcrumb-title">
								{/*首页*/}
								{this.props.menuName}
							</Col>
							<Col span="20" className="weather">
								<span className="date">{this.state.sysTime}</span>
								<span className="weather-img">
                            {/*晴转多云*/}
									<img src={this.state.dayPictureUrl}/>
                        </span>
								<span className="weather-detail">
                            {this.state.weather}
                        </span>

							</Col>
						</Row>
				}

			</div>
		);
	}

}

const mapStateToProps = state => {
	return
	{
		menuName: state.menuName
	}
};
export default connect(mapStateToProps)(Header)