import mongoose from 'mongoose';
import config from './config.js';

export default function dbConnect() {
  mongoose.connect(config.dbURI, { dbName: config.dbName })
    .then(() => console.log('DB connected'))
    .catch((e) => console.error(e));
}
