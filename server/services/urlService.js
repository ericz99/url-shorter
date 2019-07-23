import genUniqueCode from '../utils/genUniqueCode';

export default {
  // shorten link
  generateLink: req => {
    const urlCode = genUniqueCode();
    const pathUrl = req.hostname;
    const shortUrl = `http://${pathUrl}:8080/${urlCode}`;

    return {
      urlCode,
      shortUrl
    };
  }
};
