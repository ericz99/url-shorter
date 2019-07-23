import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './db';
import { APP_PORT, DB_NAME, DB_HOST, DB_PORT } from '../config/default';
import routes from './api';

(async () => {
  try {
    // connect to mongodb
    await connectDB(DB_HOST, DB_PORT, DB_NAME);

    // initalize express as app
    const app = express();

    // setup configuration for server startup
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.disable('x-powered-by');
    app.set('trust-proxy', true);

    // setup router
    app.use('/', routes);

    // global error handling
    app.use((req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // listen to server port
    app.listen(APP_PORT, err => {
      if (err) {
        console.log(err);
        process.exit(1);
      }

      console.log(`Server started on port ${APP_PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
})();
