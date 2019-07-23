import { Router } from 'express';
import url from './routes/url';

const app = Router();
url(app);

export default app;
