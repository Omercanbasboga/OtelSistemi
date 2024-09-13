import express, { Router } from 'express';
import dotenv from 'dotenv';
import conn from './db.js';
import passport from './middlewares/AAauthMiddleware.js';
import {setUserMiddleware, jwtAuthMiddleware} from './middlewares/authMiddleware.js'
import menuItemRoute from './routes/menuItemRoute.js';
import pageRoute from './routes/pageRoute.js';
import adminPageRoute from './routes/adminPageRoute.js';
import personRoute from './routes/personRoute.js';
import roomRoute from './routes/roomRoute.js';
import reservationRoute from './routes/reservationRoute.js';
import bodyParser from 'body-parser' 
import methodOverride from 'method-override';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Connection to the DB
conn();

const app = express();
const port = process.env.PORT;

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); // Move on to the next phase
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})


// EJS template engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true, 
  tempFileDir: '/tmp/',
}));
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
app.use(cookieParser());

app.use('/', pageRoute);
app.use('/admin', adminPageRoute);
app.use('/person', personRoute);
app.use('/menu', menuItemRoute);
app.use('/room', roomRoute);
app.use('/reservation', reservationRoute); 


app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
  });