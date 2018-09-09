import React from 'react';
import {Card, Form, Select } from 'antd';
import axios from '../../axios';
import './detail.less'

export default class OrderDetail extends React.Component{


	state = {}

	componentDidMount(){
		let orderId = this.props.match.params.orderId;
		if(orderId){
			this.getDetailInfo(orderId)
		}
	}

	getDetailInfo = (orderId)=> {
		axios.ajax({
			url:'/order/detail',
			data:{
				params:{
					orderId: orderId
				}
			}
		}).then((res) => {
			if(res.code == 0){
				this.setState({
					orderInfo: res.result,
				})
				this.renderMap(res.result);

			}
		})
	}

	renderMap = (result)=> {
		this.map = new window.BMap.Map("orderDetailMap");//, {enableMapClick: false}
		// this.map.centerAndZoom('北京', 11);
		this.addMapControl();
		this.drawBikeRoute(result.position_list);
		this.drawServiceArea(result.area);
		// var point = new BMap.Point(116.404, 39.915);
		// map.centerAndZoom(point, 15);
	}

	addMapControl = ()=>{
		let map = this.map;
		map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
		map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}))

	}

	drawBikeRoute = (positionList)=> {
		let map = this.map;
		let startPoint = '';
		let endPoint = '';
		if(positionList.length > 0){
			let arr = positionList[0];
			startPoint = new window.BMap.Point(arr.lon, arr.lat);
			let start_icon = new window.BMap.Icon('/asserts/start_point.png', new window.BMap.Size(36, 42),{
				imageSize: new window.BMap.Size(36,42),
				anchor: new window.BMap.Size(36,42),
			});

			let startMarker = new window.BMap.Marker(startPoint, {icon: start_icon});
			map.addOverlay(startMarker);

			arr = positionList[positionList.length-1];
			endPoint = new window.BMap.Point(arr.lon, arr.lat);
			let end_icon = new window.BMap.Icon('/asserts/end_point.png', new window.BMap.Size(36, 42),{
				imageSize: new window.BMap.Size(36,42),
				anchor: new window.BMap.Size(36,42),
			});

			let endMarker = new window.BMap.Marker(endPoint, {icon: end_icon});
			map.addOverlay(endMarker);

			//连接路线图
			let trackPoint = [];
			for(let i=0; i<positionList.length; i++){
				let point = positionList[i];
				trackPoint.push(new window.BMap.Point(point.lon, point.lat));
			}

			let polyline = new window.BMap.Polyline(trackPoint, {
				strokeColor: '#1869AD',
				strokeWidth: 3,
				strokeOpacity: 1
			})
			map.addOverlay(polyline);



			map.centerAndZoom(endPoint, 11);


		}
	}

	drawServiceArea = (positionList)=> {
		let map = this.map;

        //连接路线图
		let trackPoint = [];
		for(let i=0; i<positionList.length; i++){
			let point = positionList[i];
			trackPoint.push(new window.BMap.Point(point.lon, point.lat));
		}

        //服务区
		let polygon = new window.BMap.Polygon(trackPoint, {
			strokeColor: '#CE0000',
			strokeWidth: 4,
			strokeOpacity: 1,
			fillColor: '#ff8605',
			// fillOpacity:
		})
		map.addOverlay(polygon);
	}

	render(){

		const info = this.state.orderInfo || {};
		return(
			<div>
				<Card>
					<div id="orderDetailMap" className="order-map"> </div>

					<div className="detail-items">
						<div className="item-title">基础信息</div>
						<ul className="detail-form">
							<li>
								<div className="detail-form-left">用车模式</div>
								<div className="detail-form-content">{info.mode == 1 ?'服务区':"停车点"}</div>
							</li>
							<li>
								<div className="detail-form-left">订单编号</div>
								<div className="detail-form-content">{info.order_sn}</div>
							</li>
							<li>
								<div className="detail-form-left">车辆编号</div>
								<div className="detail-form-content">{info.bike_sn}</div>
							</li>
							<li>
								<div className="detail-form-left">用户姓名</div>
								<div className="detail-form-content">{info.user_name}</div>
							</li>
							<li>
								<div className="detail-form-left">手机号码</div>
								<div className="detail-form-content">{info.mobile}</div>
							</li>
						</ul>
					</div>

					<div className="detail-items">
						<div className="item-title">行驶轨迹</div>
						<ul className="detail-form">
							<li>
								<div className="detail-form-left">行程起点</div>
								<div className="detail-form-content">{info.start_location}</div>
							</li>
							<li>
								<div className="detail-form-left">行程终点</div>
								<div className="detail-form-content">{info.end_location}</div>
							</li>
							<li>
								<div className="detail-form-left">行驶里程</div>
								<div className="detail-form-content">{info.distance/1000}公里</div>
							</li>
						</ul>
					</div>
				</Card>

			</div>
		)
	}
}