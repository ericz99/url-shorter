import mongoose, { Schema } from 'mongoose';

const urlSchema = new Schema({
  originalUrl: String,
  urlCode: String,
  shortUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('url', urlSchema);
