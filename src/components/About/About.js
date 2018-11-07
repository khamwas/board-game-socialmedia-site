import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../Icon/Icon';
import axios from 'axios';
import './About.css';
// import ReactS3Uploader from 'react-s3-uploader';

class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			types: [],
			selector: [
				'fantasy',
				'narrative',
				'challenge',
				'sensory',
				'fellowship',
				'expression',
				'discovery',
				'abnegation'
			]
		};
	}

	componentDidMount() {
		this.getFun();
		if (this.props.user[0]) {
			this.setState({ selector: this.props.user[0]['profile'].slice() });
		}
	}

	getFun() {
		axios
			.get('/api/info')
			.then((result) => this.setState({ types: result.data }));
	}

	render() {
		let display =
			this.state.types.length > 1
				? this.state.selector
						.map(
							(elem) => this.state.types.filter((item) => item.type === elem)[0]
						)
						.map((elem) => (
							<div className="typeBox">
								<div className="aboutTitleContainer">
									{/* <Icon elem={elem.type} /> */}
									<h2 className="aboutTitle">{elem.type.toUpperCase()}</h2>
								</div>
								<div className="aboutKeysContainer">
									<div className="aboutDescription">{elem.description}</div>
									<div className="aboutKeys">Keys: {elem.keys}</div>
								</div>
							</div>
						))
				: null;
		return (
			<div>
				<h1 className="text">The 8 Types of Fun in Gaming</h1>
				<p className="text description">
					These are descriptions of the metrics that make up the 8 Type of Fun
					system. All games are rated by these metrics and we are able to
					determine the best games for your type of fun based on the profile you
					are assigned when you take the quiz and sign up.
				</p>
				{display}
				{/* {thing} */}
				{/* <ReactS3Uploader
					signingUrl="/s3/sign"
					signingUrlMethod="GET"
					accept="image/*"
					s3path={`/${process.env.S3_BUCKET}/`}
					// preprocess={this.onUploadStart}
					// onSignedUrl={this.onSignedUrl}
					// onProgress={this.onUploadProgress}
					// onError={this.onUploadError}
					// onFinish={this.onUploadFinish}
					// signingUrlHeaders={{ additional: headers }}
					// signingUrlQueryParams={{ additional: query - params }}
					signingUrlWithCredentials={true} // in case when need to pass authentication credentials via CORS
					uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }} // this is the default
					contentDisposition="auto"
					scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/gi, '')}
					// server="http://cross-origin-server.com"
					inputRef={(cmp) => (this.uploadInput = cmp)}
					autoUpload={false}
				/> */}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(About);
