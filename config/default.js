export const {
  APP_PORT = 8080,
  NODE_ENV = 'development',

  DB_USERNAME = 'admin',
  DB_PASSWORD = 'secret',
  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME = 'url-shorter-db'
} = process.env;

export const IN_PROD = NODE_ENV === 'production';
