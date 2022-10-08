import React, {Component} from 'react';
import '../assets/css/app.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { authenticate, isAuth, setCookie } from "../helpers/auth";
import { Link, NavLink, Redirect } from "react-router-dom";
import {Motion, spring} from 'react-motion';
import NavigationPanel from './components/NavigationPanel';
import Modal from './components/Modal';

class LoginComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mounted: false
		};
	}

	componentDidMount() {
		this.setState({ mounted: true });
	}
	
	handleSubmit = (e) => {
		this.setState({ mounted: false });
		e.preventDefault();
	}

	render() {
		const {mounted} = this.state;

		let child;
		let test = 12;

		if(mounted) {
			child = (
				<div className="App_test">
					<NavigationPanel></NavigationPanel>
					<Modal onSubmit={this.handleSubmit}/>
				</div>
			);
		}
		
		return(
			<div className="App">
				      {isAuth() && isAuth().role==="admin" ? <Redirect to="/admin" /> : null}
      {isAuth() && isAuth().role==="subscriber" ? <Redirect to="/subscriber" /> : null}
      {isAuth() && isAuth().role==="owner" ? <Redirect to="/owner" /> : null}
				<ReactCSSTransitionGroup 
					transitionName="example"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
						{child}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

export default LoginComponent;