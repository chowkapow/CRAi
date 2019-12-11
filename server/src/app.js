import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';
import {} from 'dotenv/config';

import indexRouter from './routes/index';
import actorRouter from './routes/actor';
import { setCast } from './routes/utils';

const app = express();
const buildPath = path.join(__dirname, '../../client/build');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(buildPath));

setCast();

app.use('/actor', actorRouter);
app.use('/', indexRouter);
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: buildPath });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
});

export default app;
