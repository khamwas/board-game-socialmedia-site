import React, { Component } from 'react';
import './DragDrop.css';

class DragDrop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			types: [
				{ name: 'sensory', order: 'initial' },
				{ name: 'fantasy', order: 'initial' },
				{ name: 'fellowship', order: 'initial' },
				{ name: 'narrative', order: 'initial' },
				{ name: 'challenge', order: 'initial' },
				{ name: 'discovery', order: 'initial' },
				{ name: 'expression', order: 'initial' },
				{ name: 'abnegation', order: 'initial' }
			]
		};
		this.onDrop = this.onDrop.bind(this);
	}

componentDidMount(){
    let newTypes=this.props.types.slice()
        this.setState({types: newTypes})
    
}

	onDragStart(e, name) {
		e.dataTransfer.setData('name', name);
	}

	onDragOver(e) {
		e.preventDefault();
	}

	onDrop(e, number) {
		let name = e.dataTransfer.getData('name');

		let newTypes = this.state.types.map((type) => {
			if (type.name === name) {
				return Object.assign({}, { name: type.name, order: number });
			} else if (type.order === number) {
				return Object.assign({}, { name: type.name, order: 'initial' });
			} else {
				return type;
			}
		});

		this.setState({ types: newTypes });
	}

	makeProfile() {
		let profile = [];
		for (let i = 1; i < 9; i++) {
			profile.push(
				this.state.types
					.filter((elem) => elem.order.includes(i))
					.map((item) => item.name)[0]
			);
		}

		if (profile.length === 8) {
			this.setState({ profile: profile });
		}
	}

	render() {
		var orders = {
			'1': [],
			'2': [],
			'3': [],
			'4': [],
			'5': [],
			'6': [],
			'7': [],
			'8': [],
			'9': []
		};
		this.state.types.forEach((elem) => {orders[`${elem.order}`].push(
				<div
					key={elem.name}
					draggable
					onDragStart={(e) => this.onDragStart(e, elem.name)}
					className="draggable"
				>
					{elem.name}
				</div>
			);
		});
		// let wrappers = [];
		// for (var x in orders) {
		// 	if (x !== 'initial') {
		// 		wrappers.push(
		// 			<div
		// 				className="droppable"
		// 				onDrop={(e) => this.onDrop(e, x)}
		// 				onDragOver={(e) => this.onDragOver(e)}
		// 			>
		// 				<span className="type-header">{x.substr(-1)}</span>
		// 				{orders[x]}
		// 			</div>
		// 		);
		// 	}
		// }
		return (
			<div className="resultOuter">
				{/* <h2 className="header">Drag & Drop</h2> */}
				<div className="container-drag">
					<div
						className="order"
						onDrop={(e) => this.onDrop(e, 'initial')}
						onDragOver={(e) => this.onDragOver(e)}
					>
						{orders.initial}
					</div>
					{/* {wrappers} */}
					<div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '1')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">1</span>
							{orders['1']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '2')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">2</span>
							{orders['2']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '3')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">3</span>
							{orders['3']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '4')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">4</span>
							{orders['4']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '5')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">5</span>
							{orders['5']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '6')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">6</span>
							{orders['6']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '7')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">7</span>
							{orders['7']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '8')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">8</span>
							{orders['8']}
						</div>
					</div>
				</div>
				<button className="button draggable" onClick={() => this.makeProfile()}>
					Make Profile
				</button>
			</div>
		);
	}
}

export default DragDrop;
