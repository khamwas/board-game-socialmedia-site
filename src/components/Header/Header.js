import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: []
		};
	}
	componentDidMount() {
		this.getUser();
	}
	getUser() {
		axios
			.get('/api/gamer/2')
			.then((response) => this.setState({ user: response.data }));
	}

	render() {
		let user = this.state.user.map((elem) => (
			<div className="profile" key={elem.gamer_id}>
				<div>User: {elem.handle}</div>
				<div>Level: {elem.lvl}</div>
				<div>Role: {elem.role}</div>
			</div>
		));
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
					{user}
				</div>
				<nav className="nav">
					{games} {fun} {login} {dashboard}
				</nav>
			</div>
		);
	}
}

// export default Header;

function mapStateToProps(state) {
	const { currentUser } = state;
	return {
		currentUser
	};
}

export default connect(mapStateToProps)(Header);
