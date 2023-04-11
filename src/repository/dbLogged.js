const LoggedHours = require('../entity/loggedHours');

exports.findById = (_id) => LoggedHours.findById({ _id });

exports.findOne = (filter) => LoggedHours.findOne(filter);

exports.findOneAndUpdate = (filter, value) => LoggedHours.findOneAndUpdate(filter, value);

exports.create = (value) => LoggedHours.create(value);

exports.countDocuments = (filter) => LoggedHours.countDocuments(filter);

exports.findByIdAndDelete = (_id) => LoggedHours.findByIdAndDelete({ _id });
