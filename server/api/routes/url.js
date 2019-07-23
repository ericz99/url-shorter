import { Router } from 'express';
import validUrl from 'valid-url';

import urlService from '../../services/urlService';
import { Url } from '../../model';

const route = Router();

export default app => {
  app.use('/', route);

  route.post('/generate', async (req, res, next) => {
    const { urlCode, shortUrl } = urlService.generateLink(req, req.body);

    if (validUrl.isUri(req.body.url)) {
      let url = await Url.findOne({ originalUrl: req.body.url });

      // if original url found
      if (url) {
        return res.status(200).json({
          statusCode: 200,
          errors: [],
          data: {
            originalUrl: url.originalUrl,
            shortUrl: url.shortUrl
          }
        });
      }

      // create new record
      url = new Url({
        originalUrl: req.body.url,
        urlCode,
        shortUrl
      });

      // save url
      await url.save();

      // return user response
      return res.status(200).json({
        statusCode: 200,
        errors: [],
        data: {
          originalUrl: url.originalUrl,
          shortUrl: url.shortUrl
        }
      });
    } else {
      // return user response
      return res.status(400).json({
        statusCode: 400,
        errors: [{ message: 'Invalid url' }],
        data: null
      });
    }
  });

  route.get('/recent', async (req, res, next) => {
    const urls = await Url.find({}).sort({ createdAt: -1 });

    // return user response
    return res.status(200).json({
      statusCode: 200,
      errors: [],
      data: {
        urls
      }
    });
  });

  route.get('/:code', async (req, res, next) => {
    const { code } = req.params;

    const foundCode = await Url.findOne({ urlCode: code });
    // check if code does not exist
    if (!foundCode) {
      // return user response
      return res.status(400).json({
        statusCode: 400,
        errors: [{ message: 'Invalid short url' }],
        data: null
      });
    }

    // return originalurl
    return res.redirect(foundCode.originalUrl);
  });

  route.get('/test', (req, res) => {
    return res.status(200).json({
      statusCode: 200,
      errors: [],
      data: {
        msg: 'Successfully triggered test route!'
      }
    });
  });
};
