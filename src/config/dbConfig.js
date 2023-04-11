const mongoose = require('mongoose');

const dbURI = process.env.dbURL || 'mongodb://127.0.0.1:27017/NodeTest';

mongoose.connect(dbURI)
  .then(() => process.stdout.write(`mongoose connected to url ${dbURI} \n`))
  .catch((error) => process.stdout.write(`mongoose connection error : ${error}`));