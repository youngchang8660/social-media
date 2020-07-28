require('dotenv').config()
const express = require('express');
const {SERVER_PORT, SESSION_SECRET} = process.env;
const PORT = SERVER_PORT;
const cors = require('cors');
const connectDB = require('../config/db');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const authCtrl = require('./controllers/authControllers')

//connect db
connectDB();

const app = express();
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get('/', (req,res) => {
//     res.send('API RUNNING');
//     console.log('hit')
// });


//authentication endpoints
app.post('/api/auth/register', authCtrl.register);  //register
app.post('/api/auth/login', authCtrl.login);  //login
app.get('/api/auth/logout', authCtrl.logout); //logout

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
