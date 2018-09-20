import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import * as proxy from 'express-http-proxy';

import {expressPort} from './constants';
import {router as exampleRouter} from './routes/example.router';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/status', (req, res) => {
  res.status(200).send();
});

app.use('/example', exampleRouter);
app.use('/*', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(
    `<h1> Welcome to Express powered by nodeJS and TypeScript </h1>`
  );
  res.end();
});

http.createServer(app).listen(expressPort);
console.log(`express server listening on ${expressPort}`);
