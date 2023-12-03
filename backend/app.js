/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const signinRouter = require('./routes/sigin');
const signupRouter = require('./routes/signup');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/errorHandler');
const Error404 = require('./errors/Error404');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .catch((err) => {
    if (err) throw err;
  });

const PORT = 3000;
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use(requestLogger);

app.use(signupRouter);

app.use(signinRouter);

app.use(auth);

app.use(cardsRouter);
app.use(usersRouter);

app.use('*', (req, res, next) => {
  next(new Error404('Страница не найдена.'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
