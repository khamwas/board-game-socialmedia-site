require('dotenv').config();
const express = require('express');
const massive = require('massive');
const { json } = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const AuthStrategy = require('passport-auth0');
const session = require('express-session');
// const checkForSession = require('./middlewares/checkForSession');
// const authController = require('./controllers/authCtrl');
const gameController = require('./controllers/gameCtrl');
const gamerController = require('./controllers/gamerCtrl');
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
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7 * 2 //2 weeks
		}
	})
);

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
	console.log(req.user);

	//   const db = req.app.get('db');
	//   db.users.find(req.user.id).then(user=>{
	//       if (!user){
	//           db.users.insert(req.user)
	//       }else{
	//           req.session.user=user
	//       }
	//   })
	res.redirect('/you_are_logged_in');
});

app.get('/api/isAuthed', (req, res, next) => {
	if (req.user) {
		return res.status(200).json(req.user);
	} else {
		res.status(500).json('No user found.');
	}
});

app.get('/api/logout', (req, res, next) => {
	req.session.destroy();
	res.status(200).json('You are logged out.');
});

app.get('/api/games/', gameController.getAllGames);
app.get('/api/gamer/reviews/:id', gamerController.getReviews);
app.get('/api/gamer/:id', gamerController.getGamer);
app.get('/api/favorites/:id', gameController.getFavs);
app.get('/api/played/:id', gameController.getPlayed);
app.get('/api/suggestions', gameController.getSuggestions);
app.get('/api/game/reviews/:id', gameController.getReviews);

app.listen(port, () => {
	console.log(`Port ${port} is listening...`);
});
