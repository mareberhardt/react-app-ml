import express from 'express';
import cors from 'cors';

import ApiRouter from './api/api.router.js';

const app = express();
const corsOptions = {
    origin: true,
    methods: ['GET'],
    optionsSuccessStatus: 204
};
const corsMid = cors(corsOptions);

app.options('*', corsMid)
app.use(corsMid);
app.use('/api', ApiRouter);

app.listen(3001, () => console.log('API Ready'));