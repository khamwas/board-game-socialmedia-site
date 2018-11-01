import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: []
		};
	}
	componentDidMount() {}
	getUser() {}

	render() {
		let login = (
			<div
				onClick={() =>
					window.open(`${process.env.REACT_APP_SERVER}/login`, '_self')
				}
				className="navLink"
			>
				Login
			</div>
		);
		let dashboard = (
			<Link to="/dashboard">
				<div className="navLink">Dashboard</div>
			</Link>
		);
		let games = (
			<Link to="/allgames">
				<div className="navLink">Games</div>
			</Link>
		);
		let fun = (
			<Link to="/about">
				<div className="navLink">8 Type of Fun</div>
			</Link>
		);
		return (
			<div className="header">
				<div className="logoContainer">
					<img
						className="logo"
						src="https://s3.us-east-2.amazonaws.com/boardashell/logo.png"
						alt="logo"
					/>
					{/* <div className="logoText">Board as Hell</div> */}
				</div>
				<nav className="nav">
					{games} {fun} {login} {dashboard}
				</nav>
			</div>
		);
	}
}

export default Header;
