import React, { Component } from 'react';
import axios from 'axios';
import GameCard from '../GameCard/GameCard';
import NewGame from '../NewGame/NewGame';

class PendingGames extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			desc: '',
			img: '',
			rules: null,
			play_time: null,
			set_up: null,
			age: null,
			min_players: null,
			max_players: null,
			pending_id:null,
			redirect: false,
			file: null,
			pendingGames: [],
			modal: false
        };
        this.modalChanger=this.modalChanger.bind(this)
	}

	componentDidMount() {
		this.setPending()
	}
	setPending(){
		axios
			.get('/api/games/pending')
			.then((result) => this.setState({ pendingGames: result.data }));
	}
  
	modalChanger() {
		this.setPending();
		this.setState({ modal: !this.state.modal });
	}
	render() {
		let games = this.state.pendingGames.map((elem, i) => (
			<div onClick={() =>
                this.setState({
                    title: elem.title,
                    desc: elem.desc,
                    img: elem.img,
					rules: elem.rules,
					gamer_id: elem.gamer_id,
					play_time: elem.play_time,
					pending_id:elem.pending_id,
                    set_up: elem.set_up,
                    age: elem.age,
                    min_players: elem.min_players,
                    max_players: elem.max_players
                },()=>this.modalChanger())
				} ><GameCard
				
				match={this.props.match}
				elem={elem}
				key={elem + i}
			/></div>
		));
		return (
			<div>
				<div>Pending Games</div>
				{this.state.modal && <NewGame title={this.state.title} desc={this.state.desc} img={this.state.img} gamer_id={this.state.gamer_id} pending_id={this.state.pending_id} rules={this.state.rules} play_time={this.state.play_time} set_up={this.state.set_up} age={this.state.age} min_players={this.state.min_players} max_players={this.state.max_players} modalChanger={this.modalChanger} />}
				<div className="gameScreen">{games}</div>
			</div>
		);
	}
}

export default PendingGames;
