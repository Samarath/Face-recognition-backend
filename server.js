const express  = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const bodyparser = require('body-parser');
const knex = require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');


const db = knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  user : 'postgres',
	  password : 12345,
	  database : 'face-recognition'
	}
 });

const app = express();

app.use(bodyparser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('it is working')})

app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 300, () => {
	console.log(`app is running at ${process.env.PORT}`);
})



