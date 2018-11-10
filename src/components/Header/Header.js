import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser, getGames, setUserProfile } from '../../redux/reducer';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
	componentDidMount() {
		this.props.setUser();
		this.props.getGames();
		if (this.props.user.length === 1) {
			this.props.setUserProfile();
		}
	}

	render() {
		let user = this.props.user.map((elem) => (
			<div className="profile" key={elem.gamer_id}>
				<div>
					User: {elem.handle}
					<br />
					Level: {elem.lvl}
					<br />
					Role: {elem.role}
				</div>
				{/* <div> </div>
				<div> </div> */}
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
				<div className="navLink types">8 Type of Fun</div>

				{/* <Link to="/about"> */}
				<div className="navLink about">About</div>
			</Link>
		);
		let search = (
			<Link to="/search">
				<div className="navLink types">Search</div>
			</Link>
		);
		return (
			<div className="header">
				<div className="logoContainer">
					<Link to="/search">
						<img
							className="logo"
							src="https://s3.us-east-2.amazonaws.com/boardashell/logo.png"
							alt="logo"
						/>
					</Link>
					{/* <div className="logoText">Board as Hell</div> */}
					{this.props.user.length < 1 ? null : user}
				</div>
				<nav className="nav">
					{search}
					{games} {fun} {this.props.user.length < 1 ? login : dashboard}
				</nav>
				{/* <Suggested /> */}
			</div>
		);
	}
}

// export default Header;

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(
	mapStateToProps,
	{ setUser, getGames, setUserProfile }
)(Header);
