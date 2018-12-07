import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import * as proxy from 'express-http-proxy';

import {expressPort} from './constants';
import {router as exampleRouter} from './routes/example.router';
import {router as idmRouter} from './routes/idm-router';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/status', (req, res) => {
  res.status(200).send();
});

app.get('/v1/authorize', (req, res) => {
  res.writeHead(302, {
    Location: 'http://localhost:3000/?p=&t=eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlTV1FpT2lJeElpd2ljR0Z5ZEc1bGNrbGtJam9pTVNJc0ltTjFjM1J2YldWeVNXUWlPaUpqZFhOMGIyMWxjakV5TXlJc0luUmxibUZ1ZEVsa0lqb2lkR1Z1WVc1ME1USXpJaXdpY0d4aGRHWnZjbTFKWkNJNklqRWlMQ0oxYzJWeVZIbHdaU0k2SWxCc1lYUm1iM0p0SWl3aWNtOXNaWE1pT2xzaWNHeGhkR1p2Y20wdFlXUnRhVzRpWFN3aWFXRjBJam94TlRRd05UazJORGc1TENKbGVIQWlPakUxTkRBMk1EQXdPRGw5Lk5mYlFRYWZTSXJqXy0yTzZvV0tPMHd0SFFZZUJhZTlDWElwVTlzczQ1ZTAiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJleHBpcmVzX2luIjozNjAwLCJzY29wZSI6Im9mZmxpbmVfYWNjZXNzIG9wZW5pZCIsInRva2VuX3R5cGUiOiJCZWFyZXIifQ%3D%3D'
  });
  res.end();
});

app.use('/idm/v1', idmRouter);

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
