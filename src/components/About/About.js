import React, { Component } from 'react';
// import ReactS3Uploader from 'react-s3-uploader';

class About extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<div>
				<div>About</div>
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

export default About;
