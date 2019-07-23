import mongoose from 'mongoose';

export default async (host, port, name, obj = {}) => {
  try {
    await mongoose.connect(`mongodb://${host}:${port}/${name}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      ...obj
    });

    console.log('Successfully connnected to mongoDB');
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};
