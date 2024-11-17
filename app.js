const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db')
const cors = require('cors');

dotenv.config()

connectDb();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',  // Allow all domains or restrict to a specific one
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // List the HTTP methods you want to allow
    credentials: true,  // Allow cookies to be sent in cross-origin requests
  }));

app.use(express.json());
app.use(cookieParser());

module.exports = app;