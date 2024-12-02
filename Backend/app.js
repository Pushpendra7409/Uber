import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import connectToDb from './db/db.js';
import router from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/users', router);

export default app;