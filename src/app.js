import express from 'express';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';

import dbConnect from './config/db.js';
import { __dirname } from './__dirname.js';
import { userRoutes } from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('views', __dirname + '/views');
app.set('view engine', '.hbs');

app.use('/', userRoutes);

dbConnect();
app.listen(3000, () => console.log('Running...'));
