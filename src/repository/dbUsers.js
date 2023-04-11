const Users = require('../entity/users');

exports.findUserById = (_id) => Users.findById({ _id });

exports.findOne = (filter) => Users.findOne(filter);

exports.findOneAndUpdate = (filter, value) => Users.findOneAndUpdate(filter, value);

exports.create = (value) => Users.create(value);

exports.countDocuments = (filter) => Users.countDocuments(filter);

exports.findByIdAndDelete = (_id) => Users.findByIdAndDelete({ _id });
