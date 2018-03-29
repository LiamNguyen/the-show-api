const mongoose = require('mongoose');

exports.connect = () => {
  mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@` +
    `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    { useMongoClient: true, promiseLibrary: global.Promise }
  );
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to mongodb');
  });
};
