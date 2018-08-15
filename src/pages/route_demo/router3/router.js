import React from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Main from './Main'
import About from './../route1/About'
import Info from './Info'
import Topic from './../route1/Topic'
import Home from './Home'
import NoMatch from './NoMatch'
export default class IRouter extends React.Component{

	render(){
		return (
			<Router>
				<Home>
					<Switch>
						<Route path="/main"
						       render={
							       ()=>
								       <Main>
									       {/*<div> this is a sub child element</div>*/}
									       <Route path="/main/:value" component={Info}></Route>
								       </Main>
						       }
						></Route>
						<Route path="/about" component={About}></Route>
						<Route exact={true} path="/about/abc" component={About}></Route>
						<Route path="/topic" component={Topic}></Route>
						<Route component={NoMatch}></Route>
					</Switch>

				</Home>
			</Router>
		);
	}
}