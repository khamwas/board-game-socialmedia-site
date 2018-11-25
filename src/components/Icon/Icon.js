import React, { Component } from 'react';
import './Icon.css';

class Icon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			abnegation: {
				alt: 'abnegation',
				src: 'https://s3.us-east-2.amazonaws.com/boardashell/abnegation.svg'
			},
			challenge: {
				alt: 'challenge',
				src: 'https://s3.us-east-2.amazonaws.com/boardashell/challenge.svg'
			},
			expression: {
				alt: 'expression',
				src: 'https://s3.us-east-2.amazonaws.com/boardashell/expression.svg'
			},
			discovery: {
				alt: 'discovery',
				src: 'https://s3.us-east-2.amazonaws.com/boardashell/discovery.svg'
			},
			fellowship: {
				alt: 'fellowship',
				src: 'https://s3.us-east-2.amazonaws.com/boardashell/fellowship.svg'
			},
			fantasy: {
				alt: 'fantasy',
				src: 'https://s3.us-east-2.amazonaws.com/boardashell/fantasy.svg'
			},
			sensory: {
				alt: 'sensory',
				src: 'https://s3.us-east-2.amazonaws.com/boardashell/sensory.svg'
			},
			narrative: {
				alt: 'narrative',
				src: 'https://s3.us-east-2.amazonaws.com/boardashell/narrative.svg'
			},
			favorite: {
				alt: 'favorite',
				src: 'https://s3.us-east-2.amazonaws.com/boardashell/heart.svg'
			},
			review: {
				alt: 'review',
				src: 'https://s3.us-east-2.amazonaws.com/boardashell/reviews.svg'
			},
			played: {
				alt: 'played',
				src: 'https://s3.us-east-2.amazonaws.com/boardashell/checkmark.svg'
			},
			suggested: {
				alt: 'suggested',
				src: 'https://s3.us-east-2.amazonaws.com/boardashell/suggested.svg'
			},
			playtogether: {
				alt: 'playtogether',
				src: 'https://s3.us-east-2.amazonaws.com/boardashell/play-together.svg'
			},
			news: {
				alt: 'news',
				src: 'https://s3.us-east-2.amazonaws.com/boardashell/news.png'
			}
		};
	}
	render() {
		let alt = this.state[this.props.elem]['alt'];
		let src = this.state[this.props.elem]['src'];
		return (
			<img
				className={this.props.clicked ? 'selectedIcon icon' : 'icon'}
				alt={alt}
				src={src}
			/>
		);
	}
}

export default Icon;
