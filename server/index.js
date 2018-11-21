require('dotenv').config();
const express = require('express');
const massive = require('massive');
const { json } = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const AuthStrategy = require('passport-auth0');
const session = require('express-session');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const path = require('path');
// const checkForSession = require('./middlewares/checkForSession');
// const authController = require('./controllers/authCtrl');
const gameController = require('./controllers/gameCtrl');
const gamerController = require('./controllers/gamerCtrl');
const authController = require('./controllers/authCtrl');
const userController = require('./controllers/userCtrl');
const reviewController = require('./controllers/reviewCtrl');
const sharedController = require('./controllers/sharedCtrl');
const port = 3001;

const app = express();
app.use(json());
app.use(cors());
// app.use(express.static(__dirname + "/../public/build/"));
app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET,
		user: [],
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7 * 2 //2 weeks
		}
	})
);

app.use(express.static(`${__dirname}/../build`));

app.use(passport.initialize());
app.use(passport.session());
//clientID must be capital I capital D | AND ALL AuthStrategy KEYS MUST MATCH BELOW CASE
passport.use(
	new AuthStrategy(
		{
			domain: process.env.DOMAIN,
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: '/login', //Auth0 allowed callback URL
			scope: 'openid email profile'
		},
		(authToken, refreshToken, extraParams, profile, done) => {
			done(null, profile); //99% of time looks like this
		}
	)
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// app.post('/api/login', ac.login);
// app.post('/api/register', ac.register);
// app.post('/api/signout', ac.signout);
// app.get('/api/user', ac.getUser);

massive(process.env.CONNECTION_STRING)
	.then((dbInstance) => app.set('db', dbInstance))
	.catch((err) => console.log(err));

app.get(
	'/login',
	passport.authenticate('auth0', {
		successRedirect: '/success',
		failureRedirect: '/login'
	})
);

app.get('/success', (req, res, next) => {
	req.app
		.get('db')
		.gamer.where(`email=$1`, req.user._json.email)
		.then((result) => {
			req.session.user = result;
			let obj = Object.assign({}, result[0]);
			let arr = [];
			for (let i = 0; i < 15; i++) {
				for (let x in obj) {
					if (obj[x] === i && x !== 'lvl' && x !== 'gamer_id') {
						arr.push(x);
					}
				}
				req.session.user[0]['profile'] = arr;
			}

			res.redirect(`${process.env.REACT_APP_FRONTEND}/dashboard`);
		})
		.catch((err) => console.log(err));
});

app.get('/api/logout', (req, res, next) => {
	req.session.destroy();
	res.status(200).json('You are logged out.');
});

app.get('/api/games/', gameController.getAllGames);
app.get('/api/games/quiz', gameController.getQuizGames);
app.get('/api/gamer/reviews/:id', gamerController.getReviews);
app.get('/api/gamer/:id', gamerController.getGamer);
app.get('/api/suggestions', gameController.getSuggestions);
app.get('/api/game/reviews/:id', gameController.getReviews);
app.get('/api/favorites/:id', gameController.getFavs);
app.get('/api/played/:id', gameController.getPlayed);

app.get('/api/test', authController.printReq);

app.get('/api/info', (req, res, next) => {
	req.app
		.get('db')
		.query('select * from typeoffun')
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => res.status(500).send(err));
});

app.get('/api/user/isfavgame/:id', userController.isFav);
app.post('/api/user/isfavgame/:id', userController.isFavPost);
app.delete('/api/user/isfavgame/:id', userController.isFavDelete);

app.get('/api/user/isplayed/:id', userController.isPlayed);
app.post('/api/user/isplayed/:id', userController.isPlayedPost);
app.delete('/api/user/isplayed/:id', userController.isPlayedDelete);

app.get('/api/user', userController.getUser);
app.post('/api/user', userController.addUser);
app.get('/api/users', userController.getUsers);
app.get('/api/user/favorites', userController.getFavs);
app.get('/api/user/played', userController.getPlayed);
app.get('/api/user/suggestions', userController.getSuggestions);
app.get('/api/user/reviews', userController.getReviews);
app.get('/api/user/newsFeed', userController.getNewsFeed);

app.post('/api/user/review', reviewController.postReview);
app.put('/api/user/review', reviewController.updateReview);
app.delete('/api/user/review/:id', reviewController.deleteReview);

app.get('/api/both/played/:id', sharedController.getBothPlayed);
app.get('/api/both/favorites/:id', sharedController.getBothFavs);
app.get('/api/both/reviews/:id', sharedController.getReviews);
app.get('/api/both/suggestions/:id', sharedController.getBothSuggestions);

app.get('/api/games/pending', gameController.pending);
app.post('/api/game/suggestion', gameController.suggestion);
app.post('/api/game', gameController.approved);
app.delete('/api/game/suggestion/:id', gameController.deletePending);

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
	const params = {
		ACL: 'public-read',
		Body: buffer,
		Bucket: process.env.S3_BUCKET,
		ContentType: type.mime,
		Key: `${name}.${type.ext}`
	};
	return s3.upload(params).promise();
};

// Define POST route
app.post('/test-upload', (request, response) => {
	const form = new multiparty.Form();
	form.parse(request, async (error, fields, files) => {
		if (error) throw new Error(error);
		try {
			const path = files.file[0].path;
			const buffer = fs.readFileSync(path);
			const type = fileType(buffer);
			const timestamp = Date.now().toString();
			const fileName = `bucketFolder/${timestamp}-lg`;
			const data = await uploadFile(buffer, fileName, type);
			return response.status(200).send(data);
		} catch (error) {
			return response.status(400).send(error);
		}
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
	console.log(`Port ${port} is listening...`);
});
