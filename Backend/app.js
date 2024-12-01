import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import connectToDb from './db/db.js';

dotenv.config();
const app = express();
connectToDb();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

export default app;