/* eslint-disable no-console */
const express = require('express');
require('express-async-errors');
const cors = require('cors');

const app = express();
//const port = 8000;
const port = process.env.PORT || 8000;

const TaskRouter = require('./controllers/TaskRouter');
const BoardRouter = require('./controllers/BoardRouter');
const AuthRouter = require('./controllers/AuthRouter');

app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());
app.use(AuthRouter);
app.use('/task', TaskRouter);
app.use('/board', BoardRouter);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));