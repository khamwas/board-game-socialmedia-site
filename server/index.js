require('dotenv').config();
const express = require('express');
const massive = require('massive');
const { json } = require('body-parser');
const cors = require('cors');
const gameController = require('./controllers/gameCtrl');
// const session = require("express-session");
const port = 3001;

const app = express();
app.use(json());
app.use(cors());
// app.use(express.static(__dirname + "/../public/build/"));

massive(process.env.CONNECTION_STRING)
	.then((dbInstance) => app.set('db', dbInstance))
	.catch((err) => console.log(err));

app.get('/api/games/', gameController.getAllGames);
// app.post("/api/houses", controller.addHouse);
// app.delete("/api/houses/:id", controller.deleteHouse);

app.listen(port, () => {
	console.log(`Port ${port} is listening...`);
});
